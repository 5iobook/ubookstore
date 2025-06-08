package com.bookstore.trade.application.dto.v1.response;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.bookstore.trade.domain.trade.vo.TradeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResTradeCancelDtoApiV1 {
	private Trade trade;

	public static ResTradeCancelDtoApiV1 of(TradeEntity tradeEntity) {
		return ResTradeCancelDtoApiV1.builder()
			.trade(Trade.from(tradeEntity))
			.build();
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Trade {
		private TradeStatus status;

		public static ResTradeCancelDtoApiV1.Trade from(TradeEntity tradeEntity) {
			return ResTradeCancelDtoApiV1.Trade.builder()
				.status(tradeEntity.getStatus())
				.build();
		}
	}
}
