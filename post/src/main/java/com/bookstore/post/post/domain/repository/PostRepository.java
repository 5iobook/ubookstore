package com.bookstore.post.post.domain.repository;

import com.bookstore.post.post.domain.entity.PostEntity;
import com.querydsl.core.types.Predicate;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepository {
    PostEntity save(PostEntity entity);
    Optional<PostEntity> findById(UUID id);
    Page<PostEntity> findAll(Predicate predicate, Pageable pageable);
}
