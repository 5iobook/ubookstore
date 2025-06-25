package com.bookstore.chat.presentation.advice;

import com.bookstore.chat.infrastructure.config.AlertFeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "alertClient", url = "http://localhost:8085", configuration = AlertFeignConfig.class)
public interface AlertClient {

    @PostMapping("/slack/send")
    ResponseEntity<String> sendAlert(@RequestParam("msg") String msg);
}
