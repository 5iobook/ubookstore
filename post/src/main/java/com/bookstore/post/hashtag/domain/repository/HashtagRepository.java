package com.bookstore.post.hashtag.domain.repository;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import com.querydsl.core.types.Predicate;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HashtagRepository {
    HashtagEntity save(HashtagEntity hashtagEntity);

    Optional<HashtagEntity> findById(UUID id);

    Page<HashtagEntity> findAll(Predicate predicate, Pageable pageable);
}
