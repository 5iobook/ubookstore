package com.bookstore.user.user.infrastructure.config;

import com.bookstore.user.user.domain.vo.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.SignatureAlgorithm;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil { // jwt 토큰을 만들고 파싱하고 검증하는 역할
    private Key key; // 시크릿 키를 저장할 Key 타입 변수

    @Value("${jwt.secret}")
    private String secretString; // application.yml에서 읽어올 String 변수

    @Value("${jwt.accessTokenExpiration}")
    private Long accessTokenExpiration;

    @Value("${jwt.refreshTokenExpiration}")
    private Long refreshTokenExpiration;

    // 스프링 빈 초기화 시점에 딱 한 번 실행되어 SecretKey 객체를 생성.
    @PostConstruct
    public void init() {
        // application.yml의 Base64 문자열 시크릿 키를 올바르게 디코딩하여 Key 객체로 만듦.
        byte[] keyBytes = Decoders.BASE64.decode(secretString);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(Long userId, String email, UserRole userRole) {
        Date now = new Date(); // 현재 시간
        Date expiry = new Date(now.getTime() + accessTokenExpiration); // 만료 시간
        return Jwts.builder()
                .claim("userId", userId)
                .setSubject(email)
                .claim("role", userRole.name()) // 사용자 역할은 claim에 따로 추가
                .setIssuedAt(now) // 발급 시각
                .setExpiration(expiry) // 만료 시각
                .signWith(this.key, SignatureAlgorithm.HS256) // 미리 초기화된 'this.key' 사용 및 알고리즘 지정
                .compact(); // JWT 문자열 생성
    }


    public Claims parseToken(String token) throws JwtException { // throws JwtException 추가
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(this.key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SecurityException | MalformedJwtException | SignatureException |
                 ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            log.warn("JWT 파싱 중 오류 발생: {}", e.getMessage());
            throw new JwtException("유효하지 않은 토큰입니다.", e); // 더 일반적인 JwtException으로 묶어서 던짐
        }
    }

    public String generateRefreshToken(String email, UserRole userRole) {
        Date now = new Date(); // 현재 시간
        Date expiry = new Date(now.getTime() + refreshTokenExpiration); // 만료 시간

        return Jwts.builder()
                .setSubject("refresh:" + email)
                .claim("role", userRole.name())
                .setIssuedAt(now) // 발급 시각
                .setExpiration(expiry) // 만료 시각
                .signWith(this.key, SignatureAlgorithm.HS256)
                .compact(); // JWT 문자열 생성
    }
}
