package com.bookstore.post.hashtag.application.dto.v1.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReqHashtagPutDTOApiV1 {
    private Hashtag hashtag;

    @Getter
    @Builder
    public static class Hashtag {
        private String name;
    }
}
