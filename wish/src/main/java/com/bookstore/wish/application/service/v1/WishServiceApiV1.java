package com.bookstore.wish.application.service.v1;

import com.bookstore.wish.application.dto.v1.response.ResWishGetDTOApiV1;
import com.bookstore.wish.application.dto.v1.response.ResWishPostDTOApiV1;
import java.util.UUID;
import org.springframework.data.domain.Pageable;

public interface WishServiceApiV1 {

    ResWishPostDTOApiV1 postBy(UUID postId);

    ResWishGetDTOApiV1 getBy(Long userId, Pageable pageable);

    void deleteBy(Long userId, UUID id);
}
