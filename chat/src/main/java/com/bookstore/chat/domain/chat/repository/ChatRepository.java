package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.Chat;
import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository {

    /****
 * 지정된 사용자 ID와 채팅방 ID에 해당하는 채팅 기록을 모두 삭제합니다.
 *
 * @param userId 삭제할 채팅의 발신자 사용자 ID
 * @param roomId 삭제할 채팅이 속한 채팅방의 ID
 */
void deleteBySenderAndChatRoom_Id(String userId, Long roomId);

    /**
 * 지정된 채팅방에서 특정 시간 이후에 생성된 채팅 메시지 목록을 생성 시간 순으로 반환합니다.
 *
 * @param roomId 채팅방의 고유 ID
 * @param enterTime 기준이 되는 시간 (이 시간 이후에 생성된 채팅만 조회)
 * @return 생성 시간 오름차순으로 정렬된 채팅 메시지 리스트
 */
List<Chat> findByChatRoom_IdAndCreatedAtAfterOrderByCreatedAt(Long roomId, LocalDateTime enterTime);
}
