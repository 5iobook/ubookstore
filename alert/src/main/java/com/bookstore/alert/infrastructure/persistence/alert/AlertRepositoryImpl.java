package com.bookstore.alert.infrastructure.persistence.alert;

import com.bookstore.alert.domain.alert.entity.Alert;
import com.bookstore.alert.domain.alert.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AlertRepositoryImpl implements AlertRepository {

    private final AlertJpaRepository alertJpaRepository;

    @Override
    public Alert save(Alert alert) {
        return alertJpaRepository.save(alert);
    }

    @Override
    public Alert findById(Long id) {
        return alertJpaRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Alert> findAll(Pageable pageable) {
        return alertJpaRepository.findAll(pageable);
    }

    @Override
    public Page<Alert> findByUserId(String userId, Pageable pageable) {
        return alertJpaRepository.findByUserId(userId, pageable);
    }
}
