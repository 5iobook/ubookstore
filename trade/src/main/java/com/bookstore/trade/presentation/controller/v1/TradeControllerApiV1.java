package com.bookstore.trade.presentation.controller.v1;

import com.bookstore.common.application.dto.ResDTO;
import com.bookstore.trade.application.dto.v1.request.ReqTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.request.ReqTradeRequestDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeAcceptDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCompleteDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeGetDetailListDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeGetSearchListDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeRequestDtoApiV1;
import com.bookstore.trade.application.service.v1.TradeServiceApiV1;
import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.querydsl.core.types.Predicate;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/trades")
public class TradeControllerApiV1 {

	private final TradeServiceApiV1 tradeServiceApiV1;

	@PostMapping
	public ResponseEntity<ResDTO<ResTradeRequestDtoApiV1>> postTradeRequest(
		@Valid @RequestBody ReqTradeRequestDtoApiV1 reqTradeRequestDtoApiV1 // TODO:: 현재 접속 유저 정보 추가
	) {
		ResTradeRequestDtoApiV1 response = tradeServiceApiV1.postTradeRequest(reqTradeRequestDtoApiV1);
		return new ResponseEntity<>(
			ResDTO.<ResTradeRequestDtoApiV1>builder()
				.code("0")
				.message("거래 요청이 완료되었습니다.")
				.data(response)
				.build(),
			HttpStatus.CREATED
		);
	}

	@PostMapping("/{id}/accept")
	public ResponseEntity<ResDTO<ResTradeAcceptDtoApiV1>> postTradeAccept(@PathVariable("id") UUID id) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeAcceptDtoApiV1 response = tradeServiceApiV1.postTradeAccept(id);
		return new ResponseEntity<>(
			ResDTO.<ResTradeAcceptDtoApiV1>builder()
				.code("0")
				.message("거래 요청이 승인되었습니다.")
				.data(response)
				.build(),
			HttpStatus.ACCEPTED
		);
	}

	@PostMapping("/{id}/cancel")
	public ResponseEntity<ResDTO<ResTradeCancelDtoApiV1>> postTradeCancel(@PathVariable("id") UUID id,
		@Valid @RequestBody ReqTradeCancelDtoApiV1 reqTradeCancelDtoApiV1) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeCancelDtoApiV1 response = tradeServiceApiV1.postTradeCancel(id, reqTradeCancelDtoApiV1);
		return new ResponseEntity<>(
			ResDTO.<ResTradeCancelDtoApiV1>builder()
				.code("0")
				.message("거래 요청이 취소되었습니다.")
				.data(response)
				.build(),
			HttpStatus.NOT_ACCEPTABLE
		);
	}

	@PostMapping("/{id}/complete")
	public ResponseEntity<ResDTO<ResTradeCompleteDtoApiV1>> postTradeComplete(@PathVariable("id") UUID id) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeCompleteDtoApiV1 response = tradeServiceApiV1.postTradeComplete(id);
		return new ResponseEntity<>(
			ResDTO.<ResTradeCompleteDtoApiV1>builder()
				.code("0")
				.message("거래가 완료되었습니다.")
				.data(response)
				.build(),
			HttpStatus.OK
		);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ResDTO<ResTradeGetDetailListDtoApiV1>> getTradeDetailList(@PathVariable("id") UUID id) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeGetDetailListDtoApiV1 response = tradeServiceApiV1.getTradeDetailList(id);
		return new ResponseEntity<>(
			ResDTO.<ResTradeGetDetailListDtoApiV1>builder()
				.code("0")
				.message("거래내역 조회가 완료되었습니다.")
				.data(response)
				.build(),
			HttpStatus.OK
		);
	}

	@GetMapping
	public ResponseEntity<ResDTO<ResTradeGetSearchListDtoApiV1>> getTradeSearchList(
		@QuerydslPredicate(root = TradeEntity.class) Predicate predicate,
		@PageableDefault(page = 0, size = 10, sort = "createdAt") Pageable pageable
		) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeGetSearchListDtoApiV1 response = tradeServiceApiV1.getTradeSearchList(predicate, pageable);
		return new ResponseEntity<>(
			ResDTO.<ResTradeGetSearchListDtoApiV1>builder()
				.code("0")
				.message("거래내역 검색이 완료되었습니다.")
				.data(response)
				.build(),
			HttpStatus.OK
		);
	}
}
