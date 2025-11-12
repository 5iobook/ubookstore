import axios from 'axios';

const API_BASE = 'http://localhost:8084/v1/chats';

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  createdAt: string;
}

export interface PageResponse<T> {
  items: T[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

// 채팅방 목록 조회 (페이지네이션)
export async function fetchChatRoomListPage(page: number, size: number): Promise<PageResponse<ChatRoom>> {
  const res = await axios.get(`${API_BASE}`, { params: { page, size } });
  return {
    items: res.data.data.content,
    totalPages: res.data.data.page.totalPages,
    totalElements: res.data.data.page.totalElements,
    page: res.data.data.page.number,
    size: res.data.data.page.size,
  };
}

// 채팅방 상세 조회
export async function fetchChatRoomDetail(id: string): Promise<ChatRoom> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data.data;
}

// 채팅방 생성
export async function createChatRoom(data: { name: string; participants: string[] }): Promise<ChatRoom> {
  const res = await axios.post(API_BASE, data);
  return res.data.data;
}
