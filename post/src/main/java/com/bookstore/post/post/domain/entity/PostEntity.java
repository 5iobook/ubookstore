package com.bookstore.post.post.domain.entity;

import com.bookstore.common.domain.entity.BaseEntity;
import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import com.bookstore.post.post.domain.vo.PostStatus;
import com.bookstore.post.post.domain.vo.ProductCondition;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "p_posts")
public class PostEntity extends BaseEntity {

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

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PostHashtagEntity> postHashtags = new HashSet<>();

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

    public static PostEntity create(
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

    public void update(
        String title,
        String content,
        Integer price,
        PostStatus status,
        ProductCondition condition
    ) {
        if (title != null) this.title = title;
        if (content != null) this.content = content;
        if (price != null) this.price = new Price(price);
        if (status != null) this.status = status;
        if (condition != null) this.condition = condition;
    }

    public void updateHashtags(List<HashtagEntity> newHashtags) {
        Set<UUID> currentHashtagIds = postHashtags.stream()
            .map(postHashtag -> postHashtag.getHashtag().getId())
            .collect(Collectors.toSet());

        Set<UUID> newHashtagIds = newHashtags.stream()
            .map(HashtagEntity::getId)
            .collect(Collectors.toSet());

        postHashtags.removeIf(
            postHashtag -> !newHashtagIds.contains(postHashtag.getHashtag().getId()));

        for (HashtagEntity hashtag : newHashtags) {
            if (!currentHashtagIds.contains(hashtag.getId())) {
                postHashtags.add(PostHashtagEntity.create(this, hashtag));
            }
        }
    }

    public void incrementViewCount() {
        viewCount++;
    }

    public void incrementWishCount() {
        wishCount++;
    }

    public void decreaseWishCount() {
        wishCount--;
    }
}
