package com.bookstore.trade.application.dto.v1.response;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.bookstore.trade.domain.trade.vo.TradeMethod;
import com.bookstore.trade.domain.trade.vo.TradeStatus;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResTradeRequestDtoApiV1 {
	private Trade trade;

	public static ResTradeRequestDtoApiV1 of(TradeEntity tradeEntity) {
		return ResTradeRequestDtoApiV1.builder()
			.trade(Trade.from(tradeEntity))
			.build();
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Trade {
		private UUID id;
		private UUID buyerId;
		private UUID sellerId;
		private UUID postId;
		private TradeStatus status;
		private TradeMethod method;
		private String meetUpLocation;
		private String cancelReason;
		private LocalDateTime completedAt;

		public static Trade from(TradeEntity tradeEntity) {
			return Trade.builder()
				.id(tradeEntity.getId())
				.buyerId(tradeEntity.getBuyerId())
				.sellerId(tradeEntity.getSellerId())
				.postId(tradeEntity.getPostId())
				.status(tradeEntity.getStatus())
				.method(tradeEntity.getMethod())
				.meetUpLocation(tradeEntity.getMeetUpLocation())
				.cancelReason(tradeEntity.getCancelReason())
				.completedAt(tradeEntity.getCompletedAt())
				.build();
		}
	}
}
