package com.bookstore.chat.domain.chat.repository;

import com.bookstore.chat.domain.chat.entity.ChatRoomEnter;
import java.util.Optional;

public interface ChatRoomEnterRepository {

    /**
 * 지정된 사용자 ID와 채팅방 ID에 해당하는 ChatRoomEnter 엔티티를 조회합니다.
 *
 * @param userId 조회할 사용자의 ID
 * @param roomId 조회할 채팅방의 ID
 * @return 해당 조건에 맞는 ChatRoomEnter가 존재하면 Optional로 반환하며, 없으면 Optional.empty()를 반환합니다.
 */
Optional<ChatRoomEnter> findByUserIdAndRoomId(String userId, Long roomId);

    /**
 * 지정된 사용자 ID와 채팅방 ID에 해당하는 입장 기록이 존재하는지 확인합니다.
 *
 * @param userId 사용자 ID
 * @param roomId 채팅방 ID
 * @return 입장 기록이 존재하면 true, 그렇지 않으면 false
 */
boolean existsByUserIdAndRoomId(String userId, Long roomId);

    /**
 * 지정된 사용자 ID와 채팅방 ID에 해당하는 채팅방 입장 정보를 삭제합니다.
 *
 * @param userId 삭제할 사용자의 ID
 * @param roomId 삭제할 채팅방의 ID
 */
void deleteByUserIdAndRoomId(String userId, Long roomId);
}
