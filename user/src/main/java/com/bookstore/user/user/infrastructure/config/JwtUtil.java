package com.bookstore.user.user.infrastructure.config;

import com.bookstore.user.user.domain.vo.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
@RequiredArgsConstructor
public class JwtUtil { // jwt 토큰을 만들고 파싱하고 검증하는 역할
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.accessTokenExpiration}")
    private Long accessTokenExpiration;

    public String generateToken(String email, UserRole userRole) {
        Date now = new Date(); // 현재 시간
        Date expiry = new Date(now.getTime() + accessTokenExpiration); // 만료 시간

        return Jwts.builder()
                .setSubject(email)
                .claim("role", userRole.name()) // 사용자 역할은 claim에 따로 추가
                .setIssuedAt(now) // 발급 시각
                .setExpiration(expiry) // 만료 시각
                .signWith(SignatureAlgorithm.HS256, secret) // 서명
                .compact(); // JWT 문자열 생성
    }

    public boolean isValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secret) //
                    .build()
                    .parseClaimsJws(token); // 서명+만료시간+구조검증
            return true;
        } catch (JwtException e) {
            return false; // 유효하지 않으면 false
            //todo. token custom exception 추가
        }
    }

    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody(); // Claims: JWT 내부 데이터 (subject, issuedAt, 등등)
    }
}
