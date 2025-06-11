package com.bookstore.post.post.infrastructure.persistence;

import com.bookstore.post.post.domain.entity.PostHashtagEntity;
import com.bookstore.post.post.domain.repository.PostHashtagRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface PostHashtagJpaRepository extends JpaRepository<PostHashtagEntity, UUID>,
    PostHashtagRepository, QuerydslPredicateExecutor<PostHashtagEntity> {

    @Override
    default List<PostHashtagEntity> saveAllHashtags(List<PostHashtagEntity> entities) {
        return saveAll(entities);
    }
}
