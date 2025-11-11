import axios from 'axios';

const API_BASE = '/v1/users';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface UserListResponse {
  items: User[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

// 페이지네이션 목록 조회
export async function fetchUserListPage(page: number, size: number): Promise<UserListResponse> {
  const res = await axios.get<any>(`${API_BASE}`, { params: { page, size } });
  return {
    items: res.data.data.content,
    totalPages: res.data.data.page.totalPages,
    totalElements: res.data.data.page.totalElements,
    page: res.data.data.page.number,
    size: res.data.data.page.size,
  };
}

// 상세 조회
export async function fetchUserDetail(id: string): Promise<User> {
  const res = await axios.get<any>(`${API_BASE}/${id}`);
  return res.data.data;
}

// 사용자 생성
export async function createUser(data: { username: string; email: string }): Promise<User> {
  const res = await axios.post<any>(API_BASE, data);
  return res.data.data;
}
