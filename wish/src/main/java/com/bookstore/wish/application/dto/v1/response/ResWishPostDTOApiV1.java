package com.bookstore.wish.application.dto.v1.response;

import com.bookstore.wish.domain.entity.WishEntity;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResWishPostDTOApiV1 {
    private Wish wish;

    public static ResWishPostDTOApiV1 of(WishEntity wishEntity) {
        return ResWishPostDTOApiV1.builder()
            .wish(Wish.from(wishEntity))
            .build();
    }

    @Getter
    @Builder
    public static class Wish {
        private Long userId;
        private UUID postId;
        private LocalDateTime createdAt;

        private static Wish from(WishEntity wishEntity) {
            return Wish.builder()
                .userId(wishEntity.getUserId())
                .postId(wishEntity.getPostId())
                .createdAt(wishEntity.getCreatedAt())
                .build();
        }
    }
}
