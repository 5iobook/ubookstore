package com.bookstore.user.user.domain.repository;

import com.bookstore.user.user.domain.entity.UserEntity;

public interface UserRepository {
    Boolean existsByEmail(String email);

    UserEntity save(UserEntity user);
}
