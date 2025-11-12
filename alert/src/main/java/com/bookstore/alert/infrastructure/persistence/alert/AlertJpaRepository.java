package com.bookstore.alert.infrastructure.persistence.alert;

import com.bookstore.alert.domain.alert.entity.Alert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertJpaRepository extends JpaRepository<Alert, Long> {
    Page<Alert> findByUserId(String userId, Pageable pageable);
}
