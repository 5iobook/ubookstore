import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Input, Loading, Pagination } from '@bookstore/common-ui';
import { fetchAlertListPage, createAlert, type Alert } from '../api/alertApi';
import './AlertList.css';

function AlertList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const size = 10;

  // 새 알림 생성 폼
  const [userId, setUserId] = useState('user1');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('INFO');

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

  function handleCreateAlert() {
    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    createAlert({ userId, message, type })
      .then(() => {
        alert('알림이 생성되었습니다.');
        setMessage('');
        setPage(0);
        loadAlerts();
      })
      .catch((err) => {
        console.error('알림 생성 실패:', err);
        setError('알림 생성에 실패했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading && alerts.length === 0) {
    return <div className="alert-list__loading"><Loading size="lg" text="알림 목록을 불러오는 중..." /></div>;
  }

  return (
    <Container maxWidth="xl" className="alert-list">
      <header className="alert-list__header">
        <h1 className="alert-list__title">알림 목록</h1>
        <p className="alert-list__subtitle">시스템 알림과 메시지를 확인하세요</p>
      </header>
      
      <Card className="alert-list__create-form">
        <h3>새 알림 생성</h3>
        <div className="alert-list__form-fields">
          <div className="alert-list__form-field">
            <Input
              label="사용자 ID"
              type="text"
              value={userId}
              onChange={(value) => setUserId(value)}
              placeholder="사용자 ID 입력"
            />
          </div>
          <div className="alert-list__form-field">
            <label htmlFor="type" className="alert-list__form-label">
              타입:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="alert-list__form-select"
            >
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
              <option value="ERROR">ERROR</option>
              <option value="SUCCESS">SUCCESS</option>
            </select>
          </div>
          <div className="alert-list__form-field">
            <Input
              label="메시지"
              type="text"
              placeholder="알림 메시지 입력"
              value={message}
              onChange={(value) => setMessage(value)}
            />
          </div>
          <Button 
            onClick={handleCreateAlert} 
            disabled={loading}
            variant="primary"
          >
            알림 생성
          </Button>
        </div>
      </Card>

      <p className="alert-list__count" aria-live="polite">
        총 {totalElements}개의 알림
      </p>

      {error && (
        <div className="alert-list__error" role="alert" aria-live="assertive">
          <p className="alert-list__error-message">{error}</p>
          <Button variant="primary" onClick={loadAlerts}>
            다시 시도
          </Button>
        </div>
      )}

      {loading && alerts.length === 0 && (
        <div className="alert-list__loading" role="status" aria-live="polite">
          <Loading size="lg" text="알림 목록을 불러오는 중..." />
        </div>
      )}

      {!loading && !error && alerts.length === 0 && (
        <div className="alert-list__empty" role="status">
          <p>알림이 없습니다.</p>
        </div>
      )}

      {!loading && !error && alerts.length > 0 && (
        <>
          <section aria-label="알림 목록 테이블" className="alert-list__table">
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
                    <td className="alert-message">{alert.message}</td>
                    <td>
                      <span className={`alert-type-badge alert-type-${alert.type.toLowerCase()}`}>
                        {alert.type}
                      </span>
                    </td>
                    <td>
                      <span className={`alert-read-status ${alert.isRead ? 'read' : 'unread'}`}>
                        {alert.isRead ? '✓ 읽음' : '✗ 안읽음'}
                      </span>
                    </td>
                    <td className="alert-date">
                      {new Date(alert.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <Link to={`/alert/${alert.id}`}>
                        <Button variant="outline" size="sm">
                          상세보기
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <Pagination
            currentPage={page + 1}
            totalPages={totalPages}
            totalItems={totalElements}
            itemsPerPage={size}
            onPageChange={(newPage) => setPage(newPage - 1)}
            showInfo={true}
          />
        </>
      )}
    </Container>
  );
}

export default AlertList;
