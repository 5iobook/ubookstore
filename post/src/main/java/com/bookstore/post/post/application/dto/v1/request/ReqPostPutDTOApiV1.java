package com.bookstore.post.post.application.dto.v1.request;

import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.post.post.domain.vo.PostStatus;
import com.bookstore.post.post.domain.vo.ProductCondition;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReqPostPutDTOApiV1 {
    private Post post;

    @Builder
    @Getter
    public static class Post {
        private String title;
        private String content;
        private Integer price;
        private PostStatus status;
        private ProductCondition condition;
        private List<Hashtag> hashtagList;

        @Getter
        @Builder
        public static class Hashtag {
            private UUID hashtagId;
        }

        public void update(PostEntity postEntity) {
            postEntity.update(title, content, price, status, condition);
        }
    }
}
