package com.bookstore.user.user.application.dto.v1.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReqUserPatchNicknameDtoApiV1 {

    @Valid
    @NotNull(message = "닉네임 정보를 입력해주세요")
    private User user;

    @Builder
    @Getter
    public static class User{

        @NotBlank(message = "변경할 닉네임을 입력해주세요")
        private String nickname;

    }


}

