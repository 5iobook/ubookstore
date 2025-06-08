package com.bookstore.post.post.application.dto.v1.response;

import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.post.post.domain.entity.Price;
import com.bookstore.post.post.domain.vo.PostStatus;
import com.bookstore.post.post.domain.vo.ProductCondition;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PagedModel;

@Getter
@Builder
public class ResPostGetDTOApiV1 {
    private PostPage postPage;

    public static ResPostGetDTOApiV1 from(
        Page<PostEntity> postEntityPage,
        Map<UUID, List<String>> hashtagMap
    ) {
        return ResPostGetDTOApiV1.builder()
            .postPage(new PostPage(postEntityPage, hashtagMap))
            .build();
    }

    @Getter
    public static class PostPage extends PagedModel<PostPage.Post> {
        public PostPage(Page<PostEntity> postEntityPage, Map<UUID, List<String>> hashtagMap) {
            super(
                new PageImpl<>(
                    Post.from(postEntityPage.getContent(), hashtagMap),
                    postEntityPage.getPageable(),
                    postEntityPage.getTotalElements()
                )
            );
        }

        @Getter
        @Builder
        public static class Post {
            private String content;
            private String title;
            private Price price;
            private PostStatus status;
            private ProductCondition condition;
            private int viewCount;
            private int wishCount;
            private List<Hashtag> hashtagList;

            public static List<Post> from(List<PostEntity> postEntityList, Map<UUID, List<String>> hashtagMap) {
                return postEntityList.stream()
                    .map(post -> Post.from(
                        post,
                        hashtagMap.getOrDefault(post.getId(), List.of())
                    ))
                    .toList();
            }

            public static Post from(PostEntity postEntity, List<String> hashtagNames) {
                return Post.builder()
                    .content(postEntity.getContent())
                    .title(postEntity.getTitle())
                    .price(postEntity.getPrice())
                    .status(postEntity.getStatus())
                    .condition(postEntity.getCondition())
                    .viewCount(postEntity.getViewCount())
                    .wishCount(postEntity.getWishCount())
                    .hashtagList(Hashtag.from(hashtagNames))
                    .build();
            }

            @Getter
            @Builder
            public static class Hashtag {
                private String name;

                public static Hashtag from(String name){
                    return Hashtag.builder()
                        .name(name)
                        .build();
                }

                public static List<Hashtag> from(List<String> nameList) {
                    return nameList.stream()
                        .map(Hashtag::from)
                        .toList();
                }
            }
        }
    }
}
