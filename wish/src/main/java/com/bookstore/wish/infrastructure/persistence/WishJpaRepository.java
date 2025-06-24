package com.bookstore.wish.infrastructure.persistence;

import com.bookstore.wish.domain.entity.WishEntity;
import com.bookstore.wish.domain.repository.WishRepository;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishJpaRepository extends JpaRepository<WishEntity, UUID>, WishRepository {

}
