package com.bookstore.user.user.infrastructure.repository;

import com.bookstore.user.user.domain.entity.RefreshTokenEntity;
import com.bookstore.user.user.domain.entity.UserEntity;
import com.bookstore.user.user.domain.repository.RefreshTokenRepository;
import com.bookstore.user.user.domain.repository.UserRepository;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenJpaRepository extends JpaRepository<RefreshTokenEntity, UUID>,
        RefreshTokenRepository {

}
