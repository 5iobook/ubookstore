package com.bookstore.user.user.application.dto.v1.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResTokenDtoApiV1 {

    private String accessToken;
    private String refreshToken;

    public static ResTokenDtoApiV1 from(String accessToken, String refreshToken) {
        return ResTokenDtoApiV1.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Getter
    @Builder
    public static class Token {
        private String accessToken;
        private String refreshToken;
    }
}
