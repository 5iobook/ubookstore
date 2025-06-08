package com.bookstore.post.hashtag.application.dto.v1.response;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResHashtagGetByIdDTOApiV1 {
    private Hashtag hashtag;

    public static ResHashtagGetByIdDTOApiV1 of(HashtagEntity hashtagEntity) {
        return ResHashtagGetByIdDTOApiV1.builder()
            .hashtag(Hashtag.from(hashtagEntity))
            .build();
    }

    @Getter
    @Builder
    public static class Hashtag{
        private String name;

        public static Hashtag from(HashtagEntity hashtagEntity) {
            return Hashtag.builder()
                .name(hashtagEntity.getName())
                .build();
        }
    }
}
