package com.bookstore.post.hashtag.application.service;

import com.bookstore.common.application.exception.CustomException;
import com.bookstore.post.hashtag.application.exception.HashtagExceptionCode;
import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import com.bookstore.post.hashtag.domain.repository.HashtagRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HashtagInternalServiceImpl implements HashtagInternalService {

    private final HashtagRepository hashtagRepository;

    @Override
    public HashtagEntity findById(UUID id) {
        return hashtagRepository.findById(id)
            .orElseThrow(() -> new CustomException(HashtagExceptionCode.HASHTAG_NOT_FOUND));
    }
}
