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
public class ResTradeCompleteDtoApiV1 {
	private Trade trade;

	public static ResTradeCompleteDtoApiV1 of(TradeEntity tradeEntity) {
		return ResTradeCompleteDtoApiV1.builder()
			.trade(ResTradeCompleteDtoApiV1.Trade.from(tradeEntity))
			.build();
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Trade {
		private TradeStatus status;

		public static ResTradeCompleteDtoApiV1.Trade from(TradeEntity tradeEntity) {
			return ResTradeCompleteDtoApiV1.Trade.builder()
				.status(tradeEntity.getStatus())
				.build();
		}
	}
}
