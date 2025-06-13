package com.bookstore.user.user.domain.entity;

import com.bookstore.common.domain.entity.BaseEntity;
import com.bookstore.user.user.domain.vo.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "p_user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = true, name = "nickname")
    private String nickName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(nullable = true)
    private String profile;

    @Builder(access = AccessLevel.PRIVATE)
    public UserEntity(String userName, String nickName, String password, String email,
            UserRole userRole, String profile) {
        this.userName = userName;
        this.nickName = nickName;
        this.password = password;
        this.email = email;
        this.userRole = UserRole.USER;
        this.profile = profile;
    }

    public static UserEntity createUserEntity(String userName, String nickName, String password,
            String email,
            String profile) {
        return UserEntity.builder()
                .userName(userName)
                .nickName(nickName)
                .password(password)
                .email(email)
                .profile(profile)
                .build();
    }
}
