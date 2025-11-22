package com.bookstore.user.user.application.dto.v1.res;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResMyuserInfoDtoApiV1 {
    private ResMyuserInfoDtoApiV1.User user;

    @Builder
    @Getter
    public static class User{
        private Long id;
        
        private String userName;

        private String nickName;

        private String email;

        private String profile;
    }

}
