package com.bookstore.trade.application.dto.v1.response;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
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
public class ResTradeAcceptDtoApiV1 {
	private Trade trade;

	public static ResTradeAcceptDtoApiV1 of(TradeEntity tradeEntity) {
		return ResTradeAcceptDtoApiV1.builder()
			.trade(ResTradeAcceptDtoApiV1.Trade.from(tradeEntity))
			.build();
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Trade {
		private UUID id;
		private TradeStatus status;

		public static ResTradeAcceptDtoApiV1.Trade from(TradeEntity tradeEntity) {
			return ResTradeAcceptDtoApiV1.Trade.builder()
				.id(tradeEntity.getId())
				.status(tradeEntity.getStatus())
				.build();
		}
	}
}
