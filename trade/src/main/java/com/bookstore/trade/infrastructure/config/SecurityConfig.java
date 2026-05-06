package com.bookstore.trade.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //CSRF 방어 비활성화 (REST API 용)
                .csrf(csrf -> csrf.disable())
                
                //CORS 설정
                .cors(cors -> cors.configure(http))

                //요청 URL별로 접근 권한을 설정
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 개발 환경: 모든 요청 허용
                );

        return http.build();
    }
}