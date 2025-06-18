package com.bookstore.wish.application.service.v1;

import com.bookstore.wish.application.dto.v1.response.ResWishPostDTOApiV1;
import java.util.UUID;

public interface WishServiceApiV1 {

    ResWishPostDTOApiV1 postBy(UUID postId);
}
