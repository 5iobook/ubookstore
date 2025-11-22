package com.bookstore.user.user.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
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
        ResTokenDtoApiV1 tokenDto = userServiceApi.signIn(dto);
        ResponseCookie cookie = ResponseCookie.from("refresh_token", tokenDto.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Lax")
                .maxAge(7 * 24 * 60 * 60) // 30 분
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
                        .message("인증된 사용자만 볼 수 있는 마이페이지입니다.")
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ResDTO<Object>> getUserList(
            @org.springframework.web.bind.annotation.RequestParam(defaultValue = "0") int page,
            @org.springframework.web.bind.annotation.RequestParam(defaultValue = "10") int size) {
        
        // 임시로 빈 목록 반환 (실제 구현은 서비스 레이어에서)
        java.util.Map<String, Object> pageInfo = new java.util.HashMap<>();
        pageInfo.put("totalPages", 0);
        pageInfo.put("totalElements", 0);
        pageInfo.put("number", page);
        pageInfo.put("size", size);
        
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("content", new java.util.ArrayList<>());
        data.put("page", pageInfo);
        
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("사용자 목록 조회 성공")
                        .data(data)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResDTO<Object>> getUserDetail(@org.springframework.web.bind.annotation.PathVariable Long id) {
        // 임시로 더미 데이터 반환
        java.util.Map<String, Object> user = new java.util.HashMap<>();
        user.put("id", id);
        user.put("username", "user" + id);
        user.put("email", "user" + id + "@example.com");
        user.put("createdAt", java.time.LocalDateTime.now().toString());
        
        return ResponseEntity.ok(
                ResDTO.builder()
                        .code("0")
                        .message("사용자 상세 조회 성공")
                        .data(user)
                        .build()
        );
    }

}
