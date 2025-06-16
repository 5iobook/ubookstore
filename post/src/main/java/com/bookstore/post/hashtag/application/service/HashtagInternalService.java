package com.bookstore.post.hashtag.application.service;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import java.util.UUID;

public interface HashtagInternalService {
    HashtagEntity findById(UUID id);
}
