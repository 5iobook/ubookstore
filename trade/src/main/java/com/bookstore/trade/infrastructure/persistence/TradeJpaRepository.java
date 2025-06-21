package com.bookstore.trade.infrastructure.persistence;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.bookstore.trade.domain.trade.repository.TradeRepository;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TradeJpaRepository extends JpaRepository<TradeEntity, UUID>,
											TradeRepository,
											QuerydslPredicateExecutor<TradeEntity>
{

}
