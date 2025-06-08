package com.bookstore.chat.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * WebSocket 메시지 브로커를 구성하여 구독 및 애플리케이션 메시지 경로를 설정합니다.
     *
     * 서버에서 클라이언트로 전달되는 메시지는 "/topic" 접두사를 사용하며,
     * 클라이언트에서 서버로 전송되는 메시지는 "/api" 접두사를 사용합니다.
     *
     * @param config 메시지 브로커 레지스트리
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        //구독 주소 (클라이언트 > 서버 > 클라이언트 전송 시)
        config.enableSimpleBroker("/topic");
        // 메시지를 보낼 prefix (클라이언트 > 서버)
        config.setApplicationDestinationPrefixes("/api");
    }

    /**
     * 클라이언트가 WebSocket을 통해 연결할 수 있는 STOMP 엔드포인트를 등록합니다.
     *
     * `/ws-chat` 엔드포인트를 생성하며, 모든 오리진의 접속을 허용하고 SockJS 폴백을 지원합니다.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //WebSocket 연결 endpoint (JS에서 연결할 주소)
        registry.addEndpoint("/ws-chat").setAllowedOriginPatterns("*").withSockJS();
    }




}
