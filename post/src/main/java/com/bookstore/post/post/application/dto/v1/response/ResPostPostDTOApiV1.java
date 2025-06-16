package com.bookstore.post.post.application.dto.v1.response;

import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.post.post.domain.entity.Price;
import com.bookstore.post.post.domain.vo.PostStatus;
import com.bookstore.post.post.domain.vo.ProductCondition;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResPostPostDTOApiV1 {
    private Post post;

    public static ResPostPostDTOApiV1 of(PostEntity postEntity, List<String> hashtagNames) {
        return ResPostPostDTOApiV1.builder()
            .post(Post.from(postEntity, hashtagNames))
            .build();
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

        private static Post from(PostEntity postEntity, List<String> hashtagNames) {
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
