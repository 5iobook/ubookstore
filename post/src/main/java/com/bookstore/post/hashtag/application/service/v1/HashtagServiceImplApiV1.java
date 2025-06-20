package com.bookstore.post.hashtag.application.service.v1;

import com.bookstore.post.hashtag.application.dto.v1.request.ReqHashtagPostDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.request.ReqHashtagPutDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagGetByIdDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagGetDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagPostDTOApiV1;
import com.bookstore.post.hashtag.application.dto.v1.response.ResHashtagPutDTOApiV1;
import com.bookstore.post.hashtag.application.service.HashtagInternalService;
import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import com.bookstore.post.hashtag.domain.repository.HashtagRepository;
import com.querydsl.core.types.Predicate;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HashtagServiceImplApiV1 implements HashtagServiceApiV1 {

    private final HashtagRepository hashtagRepository;
    private final HashtagInternalService hashtagInternalService;

    @Override
    @Transactional
    public ResHashtagPostDTOApiV1 postBy(ReqHashtagPostDTOApiV1 dto) {
        HashtagEntity hashtagEntity = hashtagRepository.save(dto.createHashtag());
        return ResHashtagPostDTOApiV1.of(hashtagEntity);
    }

    @Override
    public ResHashtagGetByIdDTOApiV1 getBy(UUID id) {
        HashtagEntity hashtagEntity = hashtagInternalService.findById(id);
        return ResHashtagGetByIdDTOApiV1.of(hashtagEntity);
    }

    @Override
    public ResHashtagGetDTOApiV1 getBy(Predicate predicate, Pageable pageable) {
        Page<HashtagEntity> hashtagEntityPage = hashtagRepository.findAll(predicate, pageable);
        return ResHashtagGetDTOApiV1.of(hashtagEntityPage);
    }

    @Override
    @Transactional
    public ResHashtagPutDTOApiV1 putBy(UUID id, ReqHashtagPutDTOApiV1 dto) {
        HashtagEntity hashtagEntity = hashtagInternalService.findById(id);
        HashtagEntity updateHashtagEntity = hashtagEntity.update(dto.getHashtag().getName());
        return ResHashtagPutDTOApiV1.of(updateHashtagEntity);
    }

    @Override
    @Transactional
    public void deleteBy(UUID id) {
        HashtagEntity hashtagEntity = hashtagInternalService.findById(id);
        hashtagEntity.delete(1L);
    }

}
