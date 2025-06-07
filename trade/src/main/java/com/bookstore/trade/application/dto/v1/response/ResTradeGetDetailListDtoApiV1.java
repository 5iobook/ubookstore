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
public class ResTradeGetDetailListDtoApiV1 {
	private Trade trade;

	public static ResTradeGetDetailListDtoApiV1 of(TradeEntity tradeEntity) {
		return ResTradeGetDetailListDtoApiV1.builder()
			.trade(ResTradeGetDetailListDtoApiV1.Trade.from(tradeEntity))
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

		public static ResTradeGetDetailListDtoApiV1.Trade from(TradeEntity tradeEntity) {
			return ResTradeGetDetailListDtoApiV1.Trade.builder()
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
