package com.bookstore.wish.domain.repository;

import com.bookstore.wish.domain.entity.WishEntity;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WishRepository {
    boolean existsByUserIdAndPostId(Long userId, UUID postId);

    WishEntity save(WishEntity wishEntity);

    Page<WishEntity> findAllByUserId(Long userId, Pageable pageable);

    Optional<WishEntity> findById(UUID id);

    void deleteById(UUID id);
}
