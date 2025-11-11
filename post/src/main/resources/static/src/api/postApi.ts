import axios from 'axios';

const API_BASE = '/v1/posts';

export interface Hashtag {
  name: string;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface Post {
  title: string;
  content: string;
  price: Price;
  status: string;
  condition: string;
  viewCount: number;
  wishCount: number;
  hashtagList: Hashtag[];
}

export interface PostListResponse {
  postPage: {
    content: Post[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  };
}

export interface CreatePostRequest {
  post: {
    title: string;
    content: string;
    price: number;
    condition: string;
    hashtagList: { hashtagId: string }[];
  };
}

export async function fetchPostListPage(page: number, size: number): Promise<PostListResponse> {
  const res = await axios.get(`${API_BASE}`, { params: { page, size } });
  return res.data.data;
}

export async function fetchPostDetail(id: string): Promise<Post> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data.data.post;
}

export async function createPost(data: CreatePostRequest): Promise<Post> {
  const res = await axios.post(API_BASE, data);
  return res.data.data.post;
}

export interface HashtagItem {
  id: string;
  name: string;
}

export interface HashtagListResponse {
  hashtagPage: {
    content: HashtagItem[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  };
}

export async function fetchHashtagList(page: number = 0, size: number = 100): Promise<HashtagListResponse> {
  const res = await axios.get('/v1/hashtags', { params: { page, size } });
  return res.data.data;
}
