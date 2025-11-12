import axios from 'axios';

const API_BASE = 'http://localhost:8085/v1/alerts';

interface Alert {
  id: string;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface PageInfo {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

interface AlertListResponse {
  items: Alert[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

/**
 * 알림 목록 조회 (페이지네이션)
 */
export async function fetchAlertListPage(page: number, size: number): Promise<AlertListResponse> {
  const res = await axios.get(`${API_BASE}`, { params: { page, size } });
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
export async function fetchAlertDetail(id: string): Promise<Alert> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data.data;
}
