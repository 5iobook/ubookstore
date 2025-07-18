import axios from 'axios';

const API_BASE = 'http://localhost:8086/v1/trades';

// 페이지네이션용 거래 목록 조회
export async function fetchTradeListPage(page: number, size: number) {
  const res = await axios.get(`${API_BASE}`, { params: { page, size } });
  const tradePage = (res.data as any).data.tradePage;
  const pageInfo = tradePage.page ?? {};
  return {
    trades: tradePage?.content ?? [],
    totalPages: Number.isFinite(pageInfo.totalPages) ? pageInfo.totalPages : 1,
    totalElements: Number.isFinite(pageInfo.totalElements) ? pageInfo.totalElements : 0,
    page: Number.isFinite(pageInfo.number) ? pageInfo.number : 0,
    size: Number.isFinite(pageInfo.size) ? pageInfo.size : size,
  };
}

// 거래 목록 전체 조회 (기존: 전체 다 가져오기)
export async function fetchTradeList() {
  let allTrades: any[] = [];
  let page = 0;
  const size = 30;
  let totalPages = 1;

  do {
    const res = await axios.get(`${API_BASE}`, { params: { page, size } });
    const tradePage = (res.data as any).data.tradePage;
    allTrades = allTrades.concat(tradePage.content);
    totalPages = tradePage.totalPages;
    page++;
  } while (page < totalPages);

  return allTrades;
}

// 거래 상세 조회
export async function fetchTradeDetail(tradeId: string) {
  const res = await axios.get(`${API_BASE}/${tradeId}`);
  return (res.data as any).data.trade;
}

// 거래 등록
export async function createTrade(trade: any) {
  const res = await axios.post(API_BASE, { trade });
  return (res.data as any).data.trade;
}