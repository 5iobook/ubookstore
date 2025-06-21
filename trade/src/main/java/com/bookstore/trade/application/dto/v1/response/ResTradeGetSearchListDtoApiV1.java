package com.bookstore.trade.application.dto.v1.response;

import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.bookstore.trade.domain.trade.vo.TradeMethod;
import com.bookstore.trade.domain.trade.vo.TradeStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PagedModel;

@Getter
@Builder
public class ResTradeGetSearchListDtoApiV1 {
	private TradePage tradePage;

	public static ResTradeGetSearchListDtoApiV1 from(
		Page<TradeEntity> tradeEntityPage
	) {
		return ResTradeGetSearchListDtoApiV1.builder()
			.tradePage(new TradePage(tradeEntityPage))
			.build();
	}

	@Getter
	public static class TradePage extends PagedModel<TradePage.Trade> {
		public TradePage(Page<TradeEntity> tradeEntityPage) {
			super(
				new PageImpl<>(
					Trade.from(tradeEntityPage.getContent()),
					tradeEntityPage.getPageable(),
					tradeEntityPage.getTotalElements()
				)
			);
		}

		@Getter
		@Builder
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

			public static List<Trade> from(List<TradeEntity> tradeEntityList) {
				return tradeEntityList.stream()
					.map(Trade::from)
					.toList();
			}

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
}
