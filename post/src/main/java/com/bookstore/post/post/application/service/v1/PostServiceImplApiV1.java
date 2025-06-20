package com.bookstore.post.post.application.service.v1;

import com.bookstore.common.application.exception.CustomException;
import com.bookstore.post.hashtag.application.service.HashtagInternalService;
import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import com.bookstore.post.post.application.dto.v1.request.ReqPostPostDTOApiV1;
import com.bookstore.post.post.application.dto.v1.request.ReqPostPutDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostGetByIdDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostGetDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostPostDTOApiV1;
import com.bookstore.post.post.application.dto.v1.response.ResPostPutDTOApiV1;
import com.bookstore.post.post.application.exception.PostExceptionCode;
import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.post.post.domain.entity.PostHashtagEntity;
import com.bookstore.post.post.domain.repository.PostHashtagRepository;
import com.bookstore.post.post.domain.repository.PostRepository;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostServiceImplApiV1 implements PostServiceApiV1 {

    private final PostRepository postRepository;
    private final HashtagInternalService hashtagInternalService;
    private final PostHashtagRepository postHashtagRepository;

    @Override
    @Transactional
    public ResPostPostDTOApiV1 postBy(ReqPostPostDTOApiV1 dto) {
        PostEntity postEntity = postRepository.save(dto.createPost());

        List<PostHashtagEntity> postHashtagEntityList = dto.getPost().getHashtagList().stream()
            .map(hashtag -> {
                HashtagEntity hashtagEntity = hashtagInternalService.findById(
                    hashtag.getHashtagId());
                return PostHashtagEntity.create(postEntity, hashtagEntity);
            })
            .toList();

        List<String> hashtagNames = extractHashtagNames(
            postHashtagRepository.saveAllHashtags(postHashtagEntityList));

        return ResPostPostDTOApiV1.of(postEntity, hashtagNames);
    }

    @Override
    @Transactional
    public ResPostGetByIdDTOApiV1 getBy(UUID id) {
        PostEntity post = findPostById(id);
        List<String> postHashtag = getHashtagNamesByPost(post);
        post.incrementViewCount();
        return ResPostGetByIdDTOApiV1.of(post, postHashtag);
    }

    @Override
    public ResPostGetDTOApiV1 getBy(Predicate predicate, Pageable pageable) {
        Page<PostEntity> postPage = postRepository.findAll(predicate, pageable);
        Map<UUID, List<String>> hashtagMap = postPage.stream()
            .collect(Collectors.toMap(
                PostEntity::getId,
                this::getHashtagNamesByPost
            ));
        return ResPostGetDTOApiV1.from(postPage, hashtagMap);
    }

    @Override
    @Transactional
    public ResPostPutDTOApiV1 putBy(UUID id, ReqPostPutDTOApiV1 dto) {
        PostEntity postEntity = findPostById(id);
        dto.getPost().update(postEntity);

        if (dto.getPost().getHashtagList() != null) {
            List<HashtagEntity> newHashtags = dto.getPost().getHashtagList().stream()
                .map(ReqPostPutDTOApiV1.Post.Hashtag::getHashtagId)
                .map(hashtagInternalService::findById)
                .toList();
            postEntity.updateHashtags(newHashtags);
        }

        List<String> postHashtagNames = getHashtagNamesByPost(postEntity);
        return ResPostPutDTOApiV1.of(postEntity, postHashtagNames);
    }

    @Override
    @Transactional
    public void deleteBy(UUID id) {
        PostEntity postEntity = findPostById(id);
        postEntity.delete(1L);
    }

    @Override
    public void existsBy(UUID id) {
        findPostById(id);
    }

    @Override
    @Transactional
    public void increaseWishCount(UUID id) {
        findPostById(id).incrementWishCount();
    }

    @Override
    @Transactional
    public void decreaseWishCount(UUID id) {
        findPostById(id).decreaseWishCount();
    }

    private PostEntity findPostById(UUID id) {
        return postRepository.findById(id)
            .orElseThrow(() -> new CustomException(PostExceptionCode.POST_NOT_FOUND));
    }

    private List<String> extractHashtagNames(List<PostHashtagEntity> entities) {
        return entities.stream()
            .map(entity -> entity.getHashtag().getName())
            .toList();
    }

    private List<String> getHashtagNamesByPost(PostEntity post) {
        return postHashtagRepository.findAllByPost(post).stream()
            .map(hashtag -> hashtag.getHashtag().getName())
            .toList();
    }

}
