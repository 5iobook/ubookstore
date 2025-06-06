package com.bookstore.post.hashtag.infrastructure.presistence;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import com.bookstore.post.hashtag.domain.repository.HashtagRepository;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface HashtagJpaRepository extends JpaRepository<HashtagEntity, UUID>,
    HashtagRepository, QuerydslPredicateExecutor<HashtagEntity> {

}
