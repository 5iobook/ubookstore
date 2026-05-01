package com.bookstore.user.user.infrastructure.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtUtil jwtUtil;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); //암호화 방식 지정. 의존성 추가하면 된다.
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //CSRF 방어 비활성화 (REST API 용)
                .csrf(csrf -> csrf.disable())

                //요청 URL별로 접근 권한을 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/v1/users/reIssue","/v1/users/signup", "/v1/users/signin") // 특정 경로를 지정
                        .permitAll() //인증 없이도 모두 허용
                        .anyRequest().authenticated() //이외의 요청은 인증된 사용자만 접근 가능
                )
                // JWT 인증 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
        .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
