package com.bookstore.trade.application.service.v1;

import com.bookstore.trade.application.dto.v1.request.ReqTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.request.ReqTradeRequestDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeAcceptDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCancelDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeCompleteDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeGetDetailListDtoApiV1;
import com.bookstore.trade.application.dto.v1.response.ResTradeRequestDtoApiV1;
import java.util.UUID;

public interface TradeServiceApiV1 {
	ResTradeRequestDtoApiV1 postTradeRequest(ReqTradeRequestDtoApiV1 reqTradeRequestDtoApiV1);

	ResTradeAcceptDtoApiV1 postTradeAccept(UUID id); // TODO:: 현재 유저 정보 추가

	ResTradeCancelDtoApiV1 postTradeCancel(UUID id, ReqTradeCancelDtoApiV1 reqTradeCancelDtoApiV1); // TODO:: 현재 유저 정보 추가

	ResTradeCompleteDtoApiV1 postTradeComplete(UUID id); // TODO:: 현재 유저 정보 추가

	ResTradeGetDetailListDtoApiV1 getTradeDetailList(UUID id); // TODO:: 현재 유저 정보 추가
}
