package com.bookstore.trade.domain.trade.repository;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.querydsl.core.types.Predicate;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TradeRepository {
	TradeEntity save(TradeEntity trade);
	Optional<TradeEntity> findById(UUID id);
	Page<TradeEntity> findAll(Predicate predicate, Pageable pageable);
}
