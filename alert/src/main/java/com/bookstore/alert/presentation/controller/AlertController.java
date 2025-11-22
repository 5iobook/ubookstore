package com.bookstore.alert.presentation.controller;

import com.bookstore.alert.application.dto.request.AlertRequest;
import com.bookstore.alert.application.dto.response.AlertResponse;
import com.bookstore.alert.application.service.AlertService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createAlert(@RequestBody AlertRequest request) {
        AlertResponse alert = alertService.createAlert(request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", alert);
        response.put("message", "Alert created successfully");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAlerts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<AlertResponse> alerts = alertService.getAllAlerts(pageable);
        
        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("totalPages", alerts.getTotalPages());
        pageInfo.put("totalElements", alerts.getTotalElements());
        pageInfo.put("number", alerts.getNumber());
        pageInfo.put("size", alerts.getSize());
        
        Map<String, Object> data = new HashMap<>();
        data.put("content", alerts.getContent());
        data.put("page", pageInfo);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", data);
        response.put("message", "Alerts retrieved successfully");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getAlertById(@PathVariable Long id) {
        AlertResponse alert = alertService.getAlertById(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", alert);
        response.put("message", "Alert retrieved successfully");
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable Long id) {
        AlertResponse alert = alertService.markAsRead(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", alert);
        response.put("message", "Alert marked as read");
        
        return ResponseEntity.ok(response);
    }
}
