package com.bookstore.post.hashtag.application.dto.v1.response;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResHashtagPostDTOApiV1 {
    @Valid
    @NotNull(message = "해시태그 정보를 입력해주세요")
    private Hashtag hashtag;

    public static ResHashtagPostDTOApiV1 of(HashtagEntity hashtagEntity) {
        return ResHashtagPostDTOApiV1.builder()
            .hashtag(Hashtag.from(hashtagEntity))
            .build();
    }

    @Builder
    @Getter
    public static class Hashtag {
        @NotBlank(message = "해시태그 이름을 입력해주세요.")
        private String name;

        public static Hashtag from(HashtagEntity hashtagEntity) {
            return Hashtag.builder()
                .name(hashtagEntity.getName())
                .build();
        }
    }
}
