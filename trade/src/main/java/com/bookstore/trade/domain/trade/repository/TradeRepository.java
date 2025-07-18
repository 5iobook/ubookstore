package com.bookstore.trade.domain.trade.repository;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TradeRepository extends JpaRepository<TradeEntity, UUID>,
		 																		 QuerydslPredicateExecutor<TradeEntity> {
}
