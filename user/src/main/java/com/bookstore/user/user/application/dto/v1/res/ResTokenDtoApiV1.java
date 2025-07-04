package com.bookstore.user.user.application.dto.v1.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResTokenDtoApiV1 {

    private String token;

    public static ResTokenDtoApiV1 from(String token) {
        return ResTokenDtoApiV1.builder()
                .token(token)
                .build();
    }

    @Getter
    @Builder
    public static class Token {
        private String accessToken;
    }
}
