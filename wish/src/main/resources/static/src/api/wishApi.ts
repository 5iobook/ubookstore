import axios from 'axios';

const API_BASE = '/v1/wishes';

export interface Wish {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
}

export interface WishListResponse {
  items: Wish[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

// 페이지네이션 목록 조회
export async function fetchWishListPage(page: number, size: number): Promise<WishListResponse> {
  const res = await axios.get(`${API_BASE}`, { params: { page, size } });
  return {
    items: res.data.data.content,
    totalPages: res.data.data.page.totalPages,
    totalElements: res.data.data.page.totalElements,
    page: res.data.data.page.number,
    size: res.data.data.page.size,
  };
}

// 위시리스트 생성
export async function createWish(data: { userId: string; bookId: string }): Promise<Wish> {
  const res = await axios.post(API_BASE, data);
  return res.data.data;
}
