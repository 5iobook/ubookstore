import axios from 'axios';

const API_BASE = 'http://localhost:8081/v1/posts';

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface PostListResponse {
  items: Post[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export async function fetchPostListPage(page: number, size: number): Promise<PostListResponse> {
  const res = await axios.get(`${API_BASE}`, { params: { page, size } });
  return {
    items: res.data.data.content,
    totalPages: res.data.data.page.totalPages,
    totalElements: res.data.data.page.totalElements,
    page: res.data.data.page.number,
    size: res.data.data.page.size,
  };
}

export async function fetchPostDetail(id: string): Promise<Post> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data.data;
}

export async function createPost(data: { title: string; content: string; authorId: string }): Promise<Post> {
  const res = await axios.post(API_BASE, data);
  return res.data.data;
}
