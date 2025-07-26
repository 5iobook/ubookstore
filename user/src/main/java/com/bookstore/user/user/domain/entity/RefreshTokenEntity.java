package com.bookstore.user.user.domain.entity;

import com.bookstore.common.domain.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "p_refresh_token")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshTokenEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    public static RefreshTokenEntity of(UserEntity user, String refreshToken, LocalDateTime expiresAt) {
        RefreshTokenEntity entity = new RefreshTokenEntity();
        entity.token = refreshToken;
        entity.user = user;
        entity.expiresAt = expiresAt;
        return entity;
    }

    public RefreshTokenEntity updateToken(String refreshToken) {
        this.token = refreshToken;
        return this;
    }
}
