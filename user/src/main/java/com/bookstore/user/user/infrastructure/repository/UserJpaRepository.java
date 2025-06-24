package com.bookstore.user.user.infrastructure.repository;

import com.bookstore.user.user.domain.entity.UserEntity;
import com.bookstore.user.user.domain.repository.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository extends JpaRepository<UserEntity, Long>, UserRepository {

}
