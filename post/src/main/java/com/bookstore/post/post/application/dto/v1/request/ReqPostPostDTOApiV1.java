package com.bookstore.post.post.application.dto.v1.request;

import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.post.post.domain.vo.ProductCondition;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReqPostPostDTOApiV1 {
    @Valid
    @NotNull(message = "게시글 정보를 입력해주세요.")
    private Post post;

    public PostEntity createPost() {
        return PostEntity.createPostEntity(
            post.getTitle(),
            post.getContent(),
            post.getPrice(),
            post.getCondition()
        );
    }

    @Builder
    @Getter
    public static class Post {
        @NotBlank(message = "게시글 제목을 입력해주세요")
        private String title;
        @NotBlank(message = "게시글 내용을 입력해주세요")
        private String content;
        @Min(1)
        private int price;
        @NotNull(message = "상품 상태 입력해주세요 [NEW, LIKE_NEW, GOOD, FAIR, POOR]")
        private ProductCondition condition;
        @NotNull(message = "게시글 해시태그를 입력해주세요.")
        private List<Hashtag> hashtagList;

        @Getter
        @Builder
        public static class Hashtag {
            private UUID hashtagId;
        }
    }
}