package com.bookstore.user.user.infrastructure.config;

import com.bookstore.user.user.domain.vo.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import javax.crypto.SecretKey;
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

    public String generateAccessToken(String email, UserRole userRole) {
        Date now = new Date(); // 현재 시간
        Date expiry = new Date(now.getTime() + accessTokenExpiration); // 만료 시간
        return Jwts.builder()
                .setSubject(email)
                .claim("role", userRole.name()) // 사용자 역할은 claim에 따로 추가
                .setIssuedAt(now) // 발급 시각
                .setExpiration(expiry) // 만료 시각
                .signWith(this.key, SignatureAlgorithm.HS256) // 미리 초기화된 'this.key' 사용 및 알고리즘 지정
                .compact(); // JWT 문자열 생성
    }

    public boolean isValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(this.key) //
                    .build()
                    .parseClaimsJws(token); // 서명+만료시간+구조검증
            return true;
        } catch (JwtException e) {
            return false; // 유효하지 않으면 false
            //todo. token custom exception 추가
        }
    }

    //todo. 예외처리
    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.key)
                .build()
                .parseClaimsJws(token)
                .getBody(); // Claims: JWT 내부 데이터 (subject, issuedAt, 등등)
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
