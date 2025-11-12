package com.bookstore.alert.application.service;

import io.github.cdimascio.dotenv.Dotenv;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

@Service
public class SlackService {

    private final Dotenv dotenv;
    private final RestTemplate restTemplate = new RestTemplate();

    public SlackService() {
        // .env 파일이 없어도 실행되도록 ignoreIfMissing 옵션 사용
        this.dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();
    }

    public void sendSlackMessage(String message) {
        String webhookUrl = dotenv.get("slack_webhook_url");
        
        // Webhook URL이 설정되지 않은 경우 로그만 출력하고 종료
        if (webhookUrl == null || webhookUrl.isEmpty()) {
            System.out.println("Slack webhook URL not configured. Message: " + message);
            return;
        }

        // JSON 형식의 요청 바디 구성
        Map<String, String> body = new HashMap<>();
        body.put("text", message);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(webhookUrl, request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("Slack message sent successfully!");
            } else {
                System.err.println("Failed to send Slack message. Status Code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}