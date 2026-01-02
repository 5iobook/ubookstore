package com.bookstore.user.user.domain.repository;

import com.bookstore.user.user.domain.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository {
    Boolean existsByEmail(String email);

    UserEntity save(UserEntity user);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findById(Long id);
    
    Page<UserEntity> findAll(Pageable pageable);
}
