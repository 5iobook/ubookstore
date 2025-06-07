package com.bookstore.trade.presentation.controller.v1;

import com.bookstore.trade.application.dto.v1.request.ReqTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.request.ReqTradeRequestDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeAcceptDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCompleteDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeGetDetailListDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeRequestDtoApiV1;
import com.bookstore.trade.application.service.v1.TradeServiceApiV1;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/v1/trades")
@RestController
public class TradeControllerApiV1 {

	private final TradeServiceApiV1 tradeServiceApiV1;

	@PostMapping
	public ResponseEntity<ResTradeRequestDtoApiV1> postTradeRequest(
		@RequestBody ReqTradeRequestDtoApiV1 reqTradeRequestDtoApiV1 // TODO:: 현재 접속 유저 정보 추가
	) {
		ResTradeRequestDtoApiV1 response = tradeServiceApiV1.postTradeRequest(reqTradeRequestDtoApiV1);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/{id}/accept")
	public ResponseEntity<ResTradeAcceptDtoApiV1> postTradeAccept(@PathVariable("id") UUID id) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeAcceptDtoApiV1 response = tradeServiceApiV1.postTradeAccept(id);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/{id}/cancel")
	public ResponseEntity<ResTradeCancelDtoApiV1> postTradeCancel(@PathVariable("id") UUID id,
		@RequestBody ReqTradeCancelDtoApiV1 reqTradeCancelDtoApiV1) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeCancelDtoApiV1 response = tradeServiceApiV1.postTradeCancel(id, reqTradeCancelDtoApiV1);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/{id}/complete")
	public ResponseEntity<ResTradeCompleteDtoApiV1> postTradeComplete(@PathVariable("id") UUID id) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeCompleteDtoApiV1 response = tradeServiceApiV1.postTradeComplete(id);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ResTradeGetDetailListDtoApiV1> getTradeDetailList(@PathVariable("id") UUID id) {  // TODO:: 현재 접속 유저 정보 추가
		ResTradeGetDetailListDtoApiV1 response = tradeServiceApiV1.getTradeDetailList(id);
		return ResponseEntity.ok(response);
	}
}
