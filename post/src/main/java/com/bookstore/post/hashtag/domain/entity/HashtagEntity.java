package com.bookstore.post.hashtag.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "p_hashtags")
public class HashtagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Builder(access = AccessLevel.PRIVATE)
    private HashtagEntity(String name) {
        this.name = name;
    }

    public static HashtagEntity createHashtagEntity(
        String name
    ) {
        return HashtagEntity.builder()
            .name(name)
            .build();
    }
}
