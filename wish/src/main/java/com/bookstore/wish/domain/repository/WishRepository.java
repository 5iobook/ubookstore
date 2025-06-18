package com.bookstore.wish.domain.repository;

import com.bookstore.wish.domain.entity.WishEntity;
import java.util.UUID;

public interface WishRepository {
    boolean existsByUserIdAndPostId(Long userId, UUID postId);

    WishEntity save(WishEntity wishEntity);
}
