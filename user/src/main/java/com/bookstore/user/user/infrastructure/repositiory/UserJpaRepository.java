package com.bookstore.user.user.infrastructure.repositiory;

import com.bookstore.user.user.domain.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository extends JpaRepository<User, Long>, UserRepository {

}
