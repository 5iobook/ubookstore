import axios from 'axios';

const API_BASE = '/v1/users';

export interface User {
  userName: string;
  nickName: string;
  email: string;
  profile: string;
}

export interface SignupRequest {
  user: {
    userName: string;
    nickName?: string;
    password: string;
    email: string;
    profile?: string;
  };
}

export interface SigninRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 회원가입
export async function signup(data: SignupRequest): Promise<void> {
  await axios.post<any>(`${API_BASE}/signup`, data);
}

// 로그인
export async function signin(data: SigninRequest): Promise<TokenResponse> {
  const res = await axios.post<any>(`${API_BASE}/signin`, data);
  return res.data.data;
}

// 내 정보 조회
export async function fetchMyInfo(): Promise<User> {
  const res = await axios.get<any>(`${API_BASE}/me`);
  return res.data.data.user;
}
