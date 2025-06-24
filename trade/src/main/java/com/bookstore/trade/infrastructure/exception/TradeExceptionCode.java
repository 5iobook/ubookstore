package com.bookstore.trade.infrastructure.exception;

import com.bookstore.common.application.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TradeExceptionCode implements ExceptionCode {
	TRADE_NOT_FOUND("T101", "해당 거래내역을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
	;

	private final String code;
	private final String message;
	private final HttpStatus status;
}
