package com.bookstore.user.user.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSigninDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSignupDtoApiV1;
import com.bookstore.user.user.application.service.v1.UserServiceApiV1;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserControllerApiV1 {
    private final UserServiceApiV1 userServiceApi;

    @PostMapping("/signup")
    public ResponseEntity<ResDTO<Object>> signupBy(@RequestBody @Valid ReqUserPostSignupDtoApiV1 dto) {
        userServiceApi.signUp(dto);
        return new ResponseEntity<>(
                ResDTO.builder()
                        .code("0")
                        .message("회원가입이 완료되었습니다")
                        .build(),
                HttpStatus.CREATED
                );
    }

    @PostMapping("/signin")
    public ResponseEntity<ResDTO<Object>> signinBy(@RequestBody @Valid ReqUserPostSigninDtoApiV1 dto){
        userServiceApi.signIn(dto);
        return new ResponseEntity<>(
                ResDTO.builder()
                        .code("0")
                        .message("로그인 되었습니다")
                        .build(),
                HttpStatus.OK
        );
    }


}
