package com.bookstore.user.user.application.dto.v1.req;

import com.bookstore.user.user.domain.entity.UserEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReqUserPostSignupDtoApiV1 {

    @Valid
    @NotNull(message = "유저 정보를 입력해주세요")
    private User user;

    public UserEntity createUser(){
        return UserEntity.createUserEntity(
                user.getUserName(),
                user.getNickName(),
                user.getPassword(),
                user.getEmail(),
                user.getProfile()
        );
    }

    @Builder
    @Getter
    public static class User{
        @NotBlank(message = "유저명을 입력해주세요")
        private String userName;

        private String nickName;

        @NotBlank(message = "비밀번호를 입력해주세요")
        private String password;

        @NotBlank(message = "이메일을 입력해주세요")
        private String email;

        private String profile;
    }
}
