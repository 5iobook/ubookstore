import axios from 'axios';
import { getCacheData, setCacheData, generateCacheKey } from '@bookstore/common-ui';

const API_BASE = '/v1/users';

export interface User {
  id: number;
  userName: string;
  email: string;
  createdAt?: string;
  nickName?: string;
  profile?: string;
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
  const cacheKey = generateCacheKey(`${API_BASE}`, { page, size });

  try {
    const res = await axios.get<any>(`${API_BASE}`, { params: { page, size } });
    const data = {
      items: res.data.data.content,
      totalPages: res.data.data.page.totalPages,
      totalElements: res.data.data.page.totalElements,
      page: res.data.data.page.number,
      size: res.data.data.page.size,
    };

    // 성공 시 캐시에 저장
    setCacheData(cacheKey, data);
    return data;
  } catch (error) {
    // 네트워크 오류 시 캐시된 데이터 반환
    if (!navigator.onLine) {
      const cachedData = getCacheData<UserListResponse>(cacheKey);
      if (cachedData) {
        console.log('오프라인: 캐시된 사용자 목록 반환');
        return cachedData;
      }
    }
    throw error;
  }
}

// 상세 조회
export async function fetchUserDetail(id: string): Promise<User> {
  const cacheKey = generateCacheKey(`${API_BASE}/${id}`);

  try {
    const res = await axios.get<any>(`${API_BASE}/${id}`);
    const data = res.data.data;

    // 성공 시 캐시에 저장
    setCacheData(cacheKey, data);
    return data;
  } catch (error) {
    // 네트워크 오류 시 캐시된 데이터 반환
    if (!navigator.onLine) {
      const cachedData = getCacheData<User>(cacheKey);
      if (cachedData) {
        console.log('오프라인: 캐시된 사용자 정보 반환');
        return cachedData;
      }
    }
    throw error;
  }
}

// 사용자 생성
export async function createUser(data: { username: string; email: string }): Promise<User> {
  const res = await axios.post<any>(API_BASE, data);
  return res.data.data;
}

// 회원가입
export async function signup(data: { userName: string; nickName?: string; password: string; email: string; profile?: string }): Promise<any> {
  const res = await axios.post<any>(`${API_BASE}/signup`, {
    user: {
      userName: data.userName,
      nickName: data.nickName || data.userName,
      password: data.password,
      email: data.email,
      profile: data.profile || ''
    }
  });
  return res.data.data;
}

// 로그인
export async function signin(data: { email: string; password: string }): Promise<any> {
  const res = await axios.post<any>(`${API_BASE}/signin`, {
    user: {
      email: data.email,
      password: data.password
    }
  });
  return res.data.data;
}

// 내 정보 조회
export async function fetchMyInfo(): Promise<User> {
  const res = await axios.get<any>(`${API_BASE}/me`);
  return res.data.data;
}
