package com.bookstore.user.user.infrastructure.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
public class JwtProperties {

    private String secret;
    private Long accessTokenExpiration;

}
