package com.bookstore.user.user.infrastructure.config;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

        if (path.equals("/v1/users/signin") || path.equals("/v1/users/signup")) {
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

        // 3. 토큰 유효성 검사
        if (!jwtUtil.isValid(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 4. 토큰에서 이메일, 역할 꺼내기
        //todo. 예외처리
        Claims claims = jwtUtil.parseToken(token);
        String email = claims.getSubject();
        String role = claims.get("role", String.class);

            ////역할 GrantedAuthority 리스트 형으로 만들기
        List<GrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority("ROLE_" + role));

        // 5. 인증 객체 생성 및 등록
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        email, null, authorities
                );

            ////IP 주소, 세션 ID, 브라우저 정보 등 웹 요청의 메타데이터 자동입력(부가정보)
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            ////사용자 인증 완료
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // 6. 다음 필터 진행
        filterChain.doFilter(request, response);

    }
}
