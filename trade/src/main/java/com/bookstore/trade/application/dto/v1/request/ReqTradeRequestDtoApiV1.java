package com.bookstore.trade.application.dto.v1.request;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.bookstore.trade.domain.trade.vo.TradeMethod;
import com.bookstore.trade.domain.trade.vo.TradeStatus;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReqTradeRequestDtoApiV1 {

	private Trade trade;

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Trade {
		private UUID id;
		private UUID buyerId;
		private UUID sellerId;
		private UUID postId;
		@Builder.Default
		private TradeStatus status = TradeStatus.REQUESTED;
		@Builder.Default
		private TradeMethod method = TradeMethod.DIRECT;
		private String meetUpLocation;

		public TradeEntity toEntity() {
			return TradeEntity.builder()
			.id(id)
			.buyerId(buyerId)
			.sellerId(sellerId)
			.postId(postId)
			.status(status)
			.method(method)
			.meetUpLocation(meetUpLocation)
			.build();
		}
	}
}
