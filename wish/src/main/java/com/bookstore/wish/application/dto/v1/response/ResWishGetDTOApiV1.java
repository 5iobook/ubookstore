package com.bookstore.wish.application.dto.v1.response;

import com.bookstore.wish.domain.entity.WishEntity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PagedModel;

@Getter
@Builder
public class ResWishGetDTOApiV1 {
    private WishPage wishPage;

    public static ResWishGetDTOApiV1 of(
        Page<WishEntity> wishEntityPage
    ) {
        return ResWishGetDTOApiV1.builder()
            .wishPage(new WishPage(wishEntityPage))
            .build();
    }

    @Getter
    public static class WishPage extends PagedModel<WishPage.Wish> {
        public WishPage(Page<WishEntity> wishEntityPage) {
            super(
                new PageImpl<>(
                    Wish.from(wishEntityPage.getContent()),
                    wishEntityPage.getPageable(),
                    wishEntityPage.getTotalElements()
                )
            );
        }

        @Getter
        @Builder
        public static class Wish {
            private UUID postId;
            private LocalDateTime createdAt;

            public static List<Wish> from(List<WishEntity> wishEntityList) {
                return wishEntityList.stream()
                    .map(Wish::from)
                    .toList();
            }

            public static Wish from(WishEntity wishEntity) {
                return Wish.builder()
                    .postId(wishEntity.getPostId())
                    .createdAt(wishEntity.getCreatedAt())
                    .build();
            }
        }
    }
}
