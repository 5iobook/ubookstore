package com.bookstore.post.post.domain.entity;

import com.bookstore.post.post.domain.vo.PostStatus;
import com.bookstore.post.post.domain.vo.ProductCondition;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "p_posts")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Embedded
    private Price price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_condition", nullable = false)
    private ProductCondition condition;

    @Column(name = "view_count", nullable = false)
    private int viewCount;

    @Column(name = "wish_count", nullable = false)
    private int wishCount;

    @Builder(access = AccessLevel.PRIVATE)
    private PostEntity(
        String title,
        String content,
        Price price,
        ProductCondition condition
    ) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.status = PostStatus.AVAILABLE;
        this.condition = condition;
        this.viewCount = 0;
        this.wishCount = 0;
    }

    public static PostEntity createPostEntity(
        String title,
        String content,
        int price,
        ProductCondition condition
    ) {
        return PostEntity.builder()
            .title(title)
            .content(content)
            .price(new Price(price))
            .condition(condition)
            .build();
    }
}
