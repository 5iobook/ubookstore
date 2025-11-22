package com.bookstore.alert.domain.alert.repository;

import com.bookstore.alert.domain.alert.entity.Alert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AlertRepository {
    Alert save(Alert alert);
    Alert findById(Long id);
    Page<Alert> findAll(Pageable pageable);
    Page<Alert> findByUserId(String userId, Pageable pageable);
}
