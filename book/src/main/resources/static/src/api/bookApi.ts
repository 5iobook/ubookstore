import axios from 'axios';

// TODO: Update port number once book service port is configured
const API_BASE = 'http://localhost:8080/v1/books';

// 페이지네이션용 도서 목록 조회
export async function fetchBookListPage(page: number, size: number) {
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
}

// 도서 상세 조회
export async function fetchBookDetail(bookId: string) {
  const res = await axios.get(`${API_BASE}/${bookId}`);
  return (res.data as any).data.book;
}

// 도서 등록
export async function createBook(book: any) {
  const res = await axios.post(API_BASE, { book });
  return (res.data as any).data.book;
}
