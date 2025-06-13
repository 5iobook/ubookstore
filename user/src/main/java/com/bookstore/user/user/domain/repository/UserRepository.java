package com.bookstore.user.user.domain.repository;

import com.bookstore.user.user.domain.entity.UserEntity;
import org.apache.catalina.User;

public interface UserRepository {
    Boolean existsByEmail(String email);

    void save(UserEntity user);
}
