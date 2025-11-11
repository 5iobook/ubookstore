package com.bookstore.post.post.application.service.v2;

import com.bookstore.post.post.entity.v2.PostV2;
import com.bookstore.post.post.infrastructure.elasticsearch.v2.PostSearchV2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostSearchV2Service {
    @Autowired
    private PostSearchV2Repository postSearchV2Repository;

    public List<PostV2> searchByTitle(String keyword) {
        // 간단한 검색 예시 - Repository 메서드 사용
        return postSearchV2Repository.findByTitleContaining(keyword);
    }
} 