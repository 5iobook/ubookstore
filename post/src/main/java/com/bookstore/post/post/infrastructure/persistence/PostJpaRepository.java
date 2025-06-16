package com.bookstore.post.post.infrastructure.persistence;

import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.post.post.domain.repository.PostRepository;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface PostJpaRepository extends
    JpaRepository<PostEntity, UUID>,
    PostRepository,
    QuerydslPredicateExecutor<PostEntity>
{

}
