package com.bookstore.trade.application.dto.v1.request;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.bookstore.trade.domain.trade.vo.TradeStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReqTradeCancelDtoApiV1 {

	private Trade trade;

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Trade {
		private String cancelReason;
		@Builder.Default
		private TradeStatus status = TradeStatus.CANCELED;

		public TradeEntity toEntity() {
			return TradeEntity.builder()
				.cancelReason(cancelReason)
				.status(status)
				.build();
		}
	}
}
