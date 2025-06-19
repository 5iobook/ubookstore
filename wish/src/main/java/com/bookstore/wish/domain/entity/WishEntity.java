package com.bookstore.wish.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "p_wishes")
public class WishEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "post_id")
    private UUID postId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder(access = AccessLevel.PRIVATE)
    private WishEntity(
        Long userId,
        UUID postId
    ) {
        this.userId = userId;
        this.postId = postId;
        this.createdAt = LocalDateTime.now();
    }

    public static WishEntity create(
        Long userId,
        UUID postId
    ) {
        return WishEntity.builder()
            .userId(userId)
            .postId(postId)
            .build();
    }

    public boolean isOwnedBy(Long userId) {
        return this.userId.equals(userId);
    }
}
