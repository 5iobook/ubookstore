package com.bookstore.post.hashtag.application.dto.v1.request;

import com.bookstore.post.hashtag.domain.entity.HashtagEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReqHashtagPostDTOApiV1 {
    @Valid
    @NotNull(message = "해시태그 정보를 입력해주세요.")
    private Hashtag hashtag;

    public HashtagEntity createHashtag() {
        return HashtagEntity.createHashtagEntity(
            hashtag.getName()
        );
    }

    @Builder
    @Getter
    public static class Hashtag {
        @NotBlank(message = "해시태그 이름을 입력해주세요.")
        private String name;
    }
}
