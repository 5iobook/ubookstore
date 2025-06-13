package com.bookstore.alert.presentation.controller;

import com.bookstore.alert.application.service.SlackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/slack")
public class SlackController {

    private final SlackService slackService;

    @PostMapping("/send")
    public ResponseEntity<String> sendSlack(@RequestParam("msg") String msg) {
        slackService.sendSlackMessage(msg);
        return ResponseEntity.ok("Alert Sent: " + msg);
    }
}
