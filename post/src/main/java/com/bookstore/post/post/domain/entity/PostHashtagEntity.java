package com.bookstore.post.post.domain.entity;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "p_post_hashtags")
public class PostHashtagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    PostEntity post;

    @ManyToOne
    @JoinColumn(name = "hashtag_id")
    HashtagEntity hashtag;

    @Builder(access = AccessLevel.PRIVATE)
    private PostHashtagEntity(
        PostEntity post,
        HashtagEntity hashtag
    ) {
        this.post = post;
        this.hashtag = hashtag;
    }

    public static PostHashtagEntity create(
        PostEntity post,
        HashtagEntity hashtag
    ) {
        return PostHashtagEntity.builder()
            .post(post)
            .hashtag(hashtag)
            .build();
    }
}
