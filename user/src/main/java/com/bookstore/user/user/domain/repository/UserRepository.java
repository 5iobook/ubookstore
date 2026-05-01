package com.bookstore.user.user.domain.repository;

import com.bookstore.user.user.domain.entity.UserEntity;
import java.util.Optional;

public interface UserRepository {
    Boolean existsByEmail(String email);

    UserEntity save(UserEntity user);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findById(Long id);

    void flush();
}
