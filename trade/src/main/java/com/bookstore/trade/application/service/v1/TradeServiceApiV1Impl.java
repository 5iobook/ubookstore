package com.bookstore.trade.application.service.v1;

import com.bookstore.trade.application.dto.v1.request.ReqTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.request.ReqTradeRequestDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeAcceptDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCompleteDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeGetDetailListDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeRequestDtoApiV1;
import com.bookstore.trade.domain.trade.entity.TradeEntity;
import com.bookstore.trade.domain.trade.repository.TradeRepository;
import com.bookstore.trade.domain.trade.vo.TradeStatus;
import jakarta.transaction.Transactional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class TradeServiceApiV1Impl implements TradeServiceApiV1 {

	private final TradeRepository tradeRepository;

	@Override
	public ResTradeRequestDtoApiV1 postTradeRequest(
		ReqTradeRequestDtoApiV1 reqTradeRequestDtoApiV1) {
		TradeEntity tradeEntity = tradeRepository.save(reqTradeRequestDtoApiV1.getTrade().toEntity());
		return ResTradeRequestDtoApiV1.of(tradeEntity);
	}

	@Override
	public ResTradeAcceptDtoApiV1 postTradeAccept(UUID id) {
		updateTradeState(id, "ACCEPTED");
		TradeEntity tradeEntity = tradeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Trade not found"));
		return ResTradeAcceptDtoApiV1.of(tradeEntity);
	}

	@Override
	public ResTradeCancelDtoApiV1 postTradeCancel(UUID id,
		ReqTradeCancelDtoApiV1 reqTradeCancelDtoApiV1) {
		updateTradeState(id, "CANCELED");
		TradeEntity tradeEntity = tradeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Trade not found"));
		return ResTradeCancelDtoApiV1.of(tradeEntity);
	}

	@Override
	public ResTradeCompleteDtoApiV1 postTradeComplete(UUID id) {
		updateTradeState(id, "COMPLETED");
		TradeEntity tradeEntity = tradeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Trade not found"));
		return ResTradeCompleteDtoApiV1.of(tradeEntity);
	}

	@Override
	public ResTradeGetDetailListDtoApiV1 getTradeDetailList(UUID id) {
		TradeEntity tradeEntity = tradeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Trade not found"));
		return ResTradeGetDetailListDtoApiV1.of(tradeEntity);
	}

	private TradeEntity updateTradeState(UUID id, String status) {
		TradeEntity tradeEntity = tradeRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Trade not found"));
		TradeStatus tradeStatus = TradeStatus.valueOf(status);
		tradeEntity.updateStatus(tradeStatus);
		return tradeEntity;
	}
}
