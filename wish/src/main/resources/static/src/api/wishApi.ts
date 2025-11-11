import axios from 'axios';

const API_BASE = '/v1/wishes';

export interface Wish {
  id: string;
  postId: string;
  userId: string;
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
  const res = await axios.get<any>(`${API_BASE}/me`, { params: { page, size } });
  return {
    items: res.data.data.wishPage.content,
    totalPages: res.data.data.wishPage.page.totalPages,
    totalElements: res.data.data.wishPage.page.totalElements,
    page: res.data.data.wishPage.page.number,
    size: res.data.data.wishPage.page.size,
  };
}

// 위시리스트 생성
export async function createWish(postId: string): Promise<Wish> {
  const res = await axios.post<any>(API_BASE, null, { params: { postId } });
  return res.data.data;
}
