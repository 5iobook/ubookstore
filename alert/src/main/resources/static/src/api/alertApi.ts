import axios from 'axios';

const API_BASE = 'http://localhost:8085/v1/alerts';

export interface Alert {
  id: number;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface ApiResponse<T> {
  data: T;
}

interface PageData {
  content: Alert[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export interface AlertListResponse {
  items: Alert[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export interface CreateAlertRequest {
  userId: string;
  message: string;
  type: string;
}

/**
 * 알림 생성
 */
export async function createAlert(request: CreateAlertRequest): Promise<Alert> {
  const res = await axios.post<ApiResponse<Alert>>(`${API_BASE}`, request);
  return res.data.data;
}

/**
 * 알림 목록 조회 (페이지네이션)
 */
export async function fetchAlertListPage(page: number, size: number): Promise<AlertListResponse> {
  const res = await axios.get<ApiResponse<PageData>>(`${API_BASE}`, { params: { page, size } });
  return {
    items: res.data.data.content,
    totalPages: res.data.data.page.totalPages,
    totalElements: res.data.data.page.totalElements,
    page: res.data.data.page.number,
    size: res.data.data.page.size,
  };
}

/**
 * 알림 상세 조회
 */
export async function fetchAlertDetail(id: number): Promise<Alert> {
  const res = await axios.get<ApiResponse<Alert>>(`${API_BASE}/${id}`);
  return res.data.data;
}

/**
 * 알림 읽음 처리
 */
export async function markAlertAsRead(id: number): Promise<Alert> {
  const res = await axios.put<ApiResponse<Alert>>(`${API_BASE}/${id}/read`);
  return res.data.data;
}
