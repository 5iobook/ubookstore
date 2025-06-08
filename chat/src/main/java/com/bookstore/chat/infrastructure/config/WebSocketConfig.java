package com.bookstore.chat.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        //구독 주소 (클라이언트 > 서버 > 클라이언트 전송 시)
        config.enableSimpleBroker("/topic");
        // 메시지를 보낼 prefix (클라이언트 > 서버)
        config.setApplicationDestinationPrefixes("/api");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //WebSocket 연결 endpoint (JS에서 연결할 주소)
        registry.addEndpoint("/ws-chat").setAllowedOriginPatterns("*").withSockJS();
    }




}
