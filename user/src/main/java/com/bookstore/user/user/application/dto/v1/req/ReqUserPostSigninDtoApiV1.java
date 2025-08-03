package com.bookstore.user.user.application.dto.v1.req;

import com.bookstore.user.user.domain.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReqUserPostSigninDtoApiV1 {

    private User user;

//    public UserEntity createUser(){
//        return UserEntity.createForSignin(
//                user.getEmail(),
//                user.getPassword()
//        );
//    }

    @Builder
    @Getter
    public static class User{

        @Email
        @NotBlank(message = "이메일을 입력해주세요")
        private String email;

        @NotBlank(message = "비밀번호를 입력해주세요")
        private String password;
    }
}
