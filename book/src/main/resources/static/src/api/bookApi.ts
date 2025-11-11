import axios from 'axios';

// Mock API 사용 여부 (백엔드가 준비되면 false로 변경)
const USE_MOCK_API = false;

// Mock API import
import * as mockApi from './mockBookApi';

// Book 백엔드 API (Naver API 프록시)
const API_BASE = 'http://localhost:8087/v1/books';

// 페이지네이션용 도서 목록 조회
export async function fetchBookListPage(page: number, size: number) {
  if (USE_MOCK_API) {
    return mockApi.fetchBookListPage(page, size);
  }

  try {
    const res = await axios.get(`${API_BASE}`, { params: { page, size } });
    const bookPage = (res.data as any).data.bookPage;
    const pageInfo = bookPage.page ?? {};
    return {
      books: bookPage?.content ?? [],
      totalPages: Number.isFinite(pageInfo.totalPages) ? pageInfo.totalPages : 1,
      totalElements: Number.isFinite(pageInfo.totalElements) ? pageInfo.totalElements : 0,
      page: Number.isFinite(pageInfo.number) ? pageInfo.number : 0,
      size: Number.isFinite(pageInfo.size) ? pageInfo.size : size,
    };
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
}

// 도서 상세 조회
export async function fetchBookDetail(bookId: string) {
  if (USE_MOCK_API) {
    return mockApi.fetchBookDetail(bookId);
  }

  try {
    const res = await axios.get(`${API_BASE}/${bookId}`);
    return (res.data as any).data.book;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
}

// 도서 등록
export async function createBook(book: any) {
  if (USE_MOCK_API) {
    return mockApi.createBook(book);
  }

  try {
    const res = await axios.post(API_BASE, { book });
    return (res.data as any).data.book;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
}
