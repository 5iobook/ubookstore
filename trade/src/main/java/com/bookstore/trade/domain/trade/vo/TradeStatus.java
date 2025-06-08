package com.bookstore.trade.domain.trade.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TradeStatus {
	REQUESTED("요청됨"),
	ACCEPTED("수락됨"),
	IN_PROGRESS("진행중"),
	COMPLETED("완료됨"),
	CANCELED("취소됨");

	private final String description;
}
