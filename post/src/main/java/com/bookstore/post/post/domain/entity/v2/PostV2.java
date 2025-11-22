package com.bookstore.post.post.entity.v2;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import java.time.LocalDateTime;

@Document(indexName = "posts-v2")
public class PostV2 {
    @Id
    private String id;
    private String title;
    private String content;
    private LocalDateTime createdAt;

    // 기본 생성자
    public PostV2() {}

    public PostV2(String id, String title, String content, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }

    // getter/setter
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
} 