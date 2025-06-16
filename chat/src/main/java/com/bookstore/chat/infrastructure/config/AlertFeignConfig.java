package com.bookstore.chat.infrastructure.config;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


public class AlertFeignConfig  {

    private final String X_USER_ROLE = "X-User-Role";
    private final String X_USER_ID = "X-User-Id";


    @Bean
    public RequestInterceptor requestInterceptor(){
        return template -> {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

            if(attributes != null){
                HttpServletRequest request = attributes.getRequest();
                String userRole = request.getHeader(X_USER_ROLE);
                String userId = request.getHeader(X_USER_ID);

                if(userId != null){
                    template.header(X_USER_ID, userId);
                }
                if(userRole != null){
                    template.header(X_USER_ROLE, userRole);
                }
            }
        };
    }
}