package com.bookstore.post.post.domain.repository;

import com.bookstore.post.post.domain.entity.PostEntity;
import com.bookstore.post.post.domain.entity.PostHashtagEntity;
import java.util.List;

public interface PostHashtagRepository {
    List<PostHashtagEntity> findAllByPost(PostEntity post);
    List<PostHashtagEntity> saveAllHashtags(List<PostHashtagEntity> entities);
}
