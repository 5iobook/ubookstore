package com.bookstore.user.user.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSigninDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSignupDtoApiV1;
import com.bookstore.user.user.application.dto.v1.res.ResTokenDtoApiV1;
import com.bookstore.user.user.application.service.v1.UserServiceApiV1;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
        log.info("로그인: 로직 시작");
        ResTokenDtoApiV1 tokenDto = userServiceApi.signIn(dto);
        log.info("로그인: dto 반환완료");
        ResponseCookie cookie = ResponseCookie.from("refresh_token", tokenDto.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Lax")
                .maxAge(7 * 24 * 60 * 60) // 7일
                .build();
        log.info("로그인: 리프레쉬토큰 쿠키 생성 ");
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        log.info("로그인: 리프레쉬토큰 set cookie");

        return new ResponseEntity<>(
                ResDTO.builder()
                        .code("0")
                        .message("로그인 되었습니다")
                        .data(tokenDto)
                        .build(),
                headers,
                HttpStatus.OK
        );
    }

    @GetMapping("/mypage")
    public ResponseEntity<ResDTO<Object>> myPage() {
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("인증된 사용자만 볼 수 있는 마이페이지입니다.")
                        .build()
        );
    }



}
