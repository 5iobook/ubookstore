package com.bookstore.user.user.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPatchNicknameDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSigninDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSignupDtoApiV1;
import com.bookstore.user.user.application.dto.v1.res.ResMyuserInfoDtoApiV1;
import com.bookstore.user.user.application.dto.v1.res.ResTokenDtoApiV1;
import com.bookstore.user.user.application.service.v1.UserServiceApiV1;
import com.bookstore.user.user.infrastructure.config.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        log.info("로그인 요청: email={}", dto.getUser().getEmail());
        try {
            ResTokenDtoApiV1 tokenDto = userServiceApi.signIn(dto);
            ResponseCookie cookie = ResponseCookie.from("refresh_token", tokenDto.getRefreshToken())
                    .httpOnly(true)
                    .secure(false) // 개발 환경에서는 false
                    .path("/")
                    .sameSite("Lax")
                    .maxAge(7 * 24 * 60 * 60)
                    .build();
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, cookie.toString());

            return new ResponseEntity<>(
                    ResDTO.builder()
                            .code("0")
                            .message("로그인 되었습니다")
                            .data(tokenDto)
                            .build(),
                    headers,
                    HttpStatus.OK
            );
        } catch (Exception e) {
            log.error("로그인 실패", e);
            throw e;
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ResDTO<Object>> userInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userid = userDetails.getUserId();
        ResMyuserInfoDtoApiV1 dto = userServiceApi.getUserInfo(userid);
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("현재 로그인된 본인의 사용자 정보입니다")
                        .data(dto)
                        .build()
        );
    }

    @GetMapping("/mypage")
    public ResponseEntity<ResDTO<Object>> myPage() {
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("마이페이지입니다.")
                        .build()
        );
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ResDTO<Object>> userInfoById(@PathVariable("userId") Long userId) {
        ResMyuserInfoDtoApiV1 dto = userServiceApi.getUserInfo(userId);
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("사용자 정보 조회입니다")
                        .data(dto)
                        .build()
        );
    }

    @PostMapping("/reIssue")
    public ResponseEntity<ResDTO<Object>> reIssueToken(@CookieValue(name = "refresh_token") String refreshToken) {
        ResTokenDtoApiV1 accessToken = userServiceApi.reIssueToken(refreshToken);
        return new ResponseEntity<>(
                ResDTO.builder()
                        .code("0")
                        .message("토큰 재발급 완료되었습니다")
                        .data(accessToken)
                        .build(),
                HttpStatus.OK
        );
    }

    @PatchMapping("/nickname")
    public ResponseEntity<ResDTO<Object>> updateNickname(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody @Valid ReqUserPatchNicknameDtoApiV1 reqDto) {
        Long userId = customUserDetails.getUserId();
        ResMyuserInfoDtoApiV1 resDto = userServiceApi.updateNickname(userId, reqDto);
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("닉네임 변경 완료되었습니다.")
                        .data(resDto)
                        .build()
        );
    }
}
