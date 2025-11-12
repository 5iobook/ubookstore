import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAlertListPage } from '../api/alertApi';

interface Alert {
  id: string;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

function AlertList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const size = 10;

  useEffect(() => {
    loadAlerts();
  }, [page]);

  async function loadAlerts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAlertListPage(page, size);
      setAlerts(data.items);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error('알림 목록 조회 실패:', err);
      setError('알림 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  function handlePrevPage() {
    if (page > 0) setPage(page - 1);
  }

  function handleNextPage() {
    if (page < totalPages - 1) setPage(page + 1);
  }

  return (
    <div>
      <h2>알림 목록</h2>
      <p>총 {totalElements}개의 알림</p>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          {alerts.length === 0 ? (
            <p>알림이 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>사용자 ID</th>
                  <th>메시지</th>
                  <th>타입</th>
                  <th>읽음 여부</th>
                  <th>생성일</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id}>
                    <td>{alert.id}</td>
                    <td>{alert.userId}</td>
                    <td>{alert.message}</td>
                    <td>{alert.type}</td>
                    <td>{alert.isRead ? '읽음' : '안읽음'}</td>
                    <td>{new Date(alert.createdAt).toLocaleString()}</td>
                    <td>
                      <Link to={`/alert/${alert.id}`}>
                        <button>상세보기</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ marginTop: 20 }}>
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={page === 0}
            >
              이전
            </button>
            <span style={{ margin: '0 10px' }}>
              {page + 1} / {totalPages || 1}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={page >= totalPages - 1}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AlertList;
