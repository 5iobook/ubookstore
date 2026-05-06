package com.bookstore.user.user.domain.repository;

import com.bookstore.user.user.domain.entity.RefreshTokenEntity;
import java.util.Optional;

public interface RefreshTokenRepository {

    Optional<RefreshTokenEntity> findByUser_Email(String email);

    RefreshTokenEntity save(RefreshTokenEntity tokenEntity);

    Optional<RefreshTokenEntity> findByToken(String refreshToken);


}
