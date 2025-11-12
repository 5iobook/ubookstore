import axios from 'axios';

const API_BASE = 'http://localhost:8084/api/chatroom';

export interface ChatRoom {
  roomId: string;
  owner: string;
  createdAt: string;
}

// 내 채팅방 목록 조회
export async function fetchMyChatRooms(userId: string): Promise<ChatRoom[]> {
  const res = await axios.get(`${API_BASE}/my`, { params: { userId } });
  return res.data;
}

// 채팅방 상세 조회
export async function fetchChatRoomDetail(roomId: string): Promise<ChatRoom> {
  const res = await axios.get(`${API_BASE}/${roomId}`);
  return res.data;
}

// 1:1 채팅방 생성 또는 기존 방 반환
export async function getOrCreateDirectChat(currentUser: string, targetUser: string): Promise<ChatRoom> {
  const res = await axios.post(`${API_BASE}/direct`, null, {
    params: { currentUser, targetUser }
  });
  return res.data;
}

// 채팅방 생성 (기존 API)
export async function createChatRoom(data: { owner: string; roomId?: string }): Promise<ChatRoom> {
  const res = await axios.post(API_BASE, data);
  return res.data;
}
