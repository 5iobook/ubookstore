package com.bookstore.user.user.domain.repository;

import com.bookstore.user.user.domain.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.Optional;

public interface UserRepository {
    Boolean existsByEmail(String email);

    UserEntity save(UserEntity user);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findById(Long id);
}
