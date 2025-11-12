package com.bookstore.alert.application.service;

import com.bookstore.alert.application.dto.request.AlertRequest;
import com.bookstore.alert.application.dto.response.AlertResponse;
import com.bookstore.alert.domain.alert.entity.Alert;
import com.bookstore.alert.domain.alert.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;

    @Transactional
    public AlertResponse createAlert(AlertRequest request) {
        Alert alert = Alert.builder()
                .userId(request.getUserId())
                .message(request.getMessage())
                .type(request.getType())
                .isRead(false)
                .build();
        
        Alert savedAlert = alertRepository.save(alert);
        return AlertResponse.from(savedAlert);
    }

    @Transactional(readOnly = true)
    public Page<AlertResponse> getAllAlerts(Pageable pageable) {
        Page<Alert> alerts = alertRepository.findAll(pageable);
        return alerts.map(AlertResponse::from);
    }

    @Transactional(readOnly = true)
    public Page<AlertResponse> getAlertsByUserId(String userId, Pageable pageable) {
        Page<Alert> alerts = alertRepository.findByUserId(userId, pageable);
        return alerts.map(AlertResponse::from);
    }

    @Transactional(readOnly = true)
    public AlertResponse getAlertById(Long id) {
        Alert alert = alertRepository.findById(id);
        if (alert == null) {
            throw new RuntimeException("Alert not found with id: " + id);
        }
        return AlertResponse.from(alert);
    }

    @Transactional
    public AlertResponse markAsRead(Long id) {
        Alert alert = alertRepository.findById(id);
        if (alert == null) {
            throw new RuntimeException("Alert not found with id: " + id);
        }
        alert.markAsRead();
        Alert updatedAlert = alertRepository.save(alert);
        return AlertResponse.from(updatedAlert);
    }
}
