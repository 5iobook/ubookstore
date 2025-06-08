package com.bookstore.trade.domain.trade.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TradeMethod {
	DIRECT("직거래"),
	DELIVERY("택배거래");

	private final String description;
}
