package com.bookstore.user.user.infrastructure.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        // 0. 로그인, 회원가입 경로는 JWT 검사 없이 무조건 통과
        String path = request.getRequestURI();

        if (path.equals("/v1/users/signin") || path.equals("/v1/users/signup") || path.equals("/v1/users/reIssue")) {
            System.out.println("JwtAuthenticationFilter: 로그인/회원가입 요청, 패스!");
            filterChain.doFilter(request, response);
            return;
        }

        // 1. 헤더가 없거나 Bearer가 아닌 경우 -> 다음 필터로 넘김
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. JWT 추출
        String token = authHeader.substring(7); // "Bearer " 이후 토큰

//        // 3. 토큰 유효성 검사
//        if (!jwtUtil.isValid(token)) {
//            filterChain.doFilter(request, response);
//            return;
//        }

        // 4. 토큰에서 이메일, 역할 꺼내기
        try {
            Claims claims = jwtUtil.parseToken(token);
            Long userId = claims.get("userId", Long.class);
            String email = claims.getSubject();
            String role = claims.get("role", String.class);

            CustomUserDetails customUserDetails = new CustomUserDetails(userId, email, role);

            // 5. 인증 객체 생성 및 등록
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            customUserDetails,
                            null, //비밀번호
                            customUserDetails.getAuthorities()
                    );
            //IP 주소, 세션 ID, 브라우저 정보 등 웹 요청의 메타데이터 자동입력(부가정보)
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken); //사용자 인증 완료

        } catch (JwtException e) {
            // parseToken에서 던져진 모든 JwtException 처리
            response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401 Unauthorized
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(String.format("{\"code\": \"AUTH_002\", \"message\": \"%s\"}", e.getMessage()));
            // e.getMessage() ->  "유효하지 않은 토큰입니다." 메시지
            return;
        } catch (Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value()); // 500 Internal Server Error
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\": \"AUTH_999\", \"message\": \"인증 처리 중 알 수 없는 오류가 발생했습니다.\"}");
            return;
        }

        // 6. 다음 필터 진행
        filterChain.doFilter(request, response);

    }
}
