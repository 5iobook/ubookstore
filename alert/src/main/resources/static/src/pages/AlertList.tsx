import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { Container, Button, Card, Input, Loading, Pagination } from '@bookstore/common-ui';
=======
import { Button, Card, Input, Loading } from '@bookstore/common-ui';
>>>>>>> dev
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

  if (loading && alerts.length === 0) {
    return <div className="alert-list__loading"><Loading size="lg" text="알림 목록을 불러오는 중..." /></div>;
  }

  return (
<<<<<<< HEAD
    <Container maxWidth="xl" className="alert-list">
      <header className="alert-list__header">
        <h1 className="alert-list__title">알림 목록</h1>
        <p className="alert-list__subtitle">시스템 알림과 메시지를 확인하세요</p>
      </header>
      
      <Card className="alert-list__create-form">
        <h3>새 알림 생성</h3>
        <div className="alert-list__form-fields">
          <div className="alert-list__form-field">
=======
    <div className="alert-list">
      <div className="alert-list__header">
        <h2 className="alert-list__title">알림 목록</h2>
        <p className="alert-list__subtitle">시스템 알림과 메시지를 확인하세요</p>
      </div>
      
      <Card style={{ marginBottom: '20px' }}>
        <h3>새 알림 생성</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ width: '100%' }}>
>>>>>>> dev
            <Input
              label="사용자 ID"
              type="text"
              value={userId}
              onChange={(value) => setUserId(value)}
              placeholder="사용자 ID 입력"
            />
          </div>
<<<<<<< HEAD
          <div className="alert-list__form-field">
            <label htmlFor="type" className="alert-list__form-label">
=======
          <div>
            <label htmlFor="type" style={{ display: 'block', marginBottom: '5px' }}>
>>>>>>> dev
              타입:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
<<<<<<< HEAD
              className="alert-list__form-select"
=======
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
>>>>>>> dev
            >
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
              <option value="ERROR">ERROR</option>
              <option value="SUCCESS">SUCCESS</option>
            </select>
          </div>
<<<<<<< HEAD
          <div className="alert-list__form-field">
=======
          <div style={{ width: '100%' }}>
>>>>>>> dev
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

<<<<<<< HEAD
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
=======
      <p style={{ marginBottom: '15px' }}>총 {totalElements}개의 알림</p>

      {error && (
        <div className="alert-list__error-message" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {alerts.length === 0 ? (
            <Card>
              <p className="alert-list__empty">알림이 없습니다.</p>
            </Card>
          ) : (
            <div className="alert-list__table">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>사용자 ID</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>메시지</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>타입</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>읽음 여부</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>생성일</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((alert) => (
                      <tr key={alert.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>{alert.id}</td>
                        <td style={{ padding: '12px' }}>{alert.userId}</td>
                        <td style={{ padding: '12px' }}>{alert.message}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            backgroundColor: 
                              alert.type === 'ERROR' ? '#fee' :
                              alert.type === 'WARNING' ? '#ffeaa7' :
                              alert.type === 'SUCCESS' ? '#dfe6e9' :
                              '#e3f2fd'
                          }}>
                            {alert.type}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {alert.isRead ? '✓ 읽음' : '✗ 안읽음'}
                        </td>
                        <td style={{ padding: '12px' }}>
                          {new Date(alert.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Link to={`/alert/${alert.id}`}>
                            <Button variant="secondary" size="sm">
                              상세보기
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="alert-list__pagination">
            <Button
              onClick={handlePrevPage}
              disabled={page === 0}
              variant="secondary"
            >
              이전
            </Button>
            <div className="alert-list__pagination-info">
              {page + 1} / {totalPages || 1}
            </div>
            <Button
              onClick={handleNextPage}
              disabled={page >= totalPages - 1}
              variant="secondary"
            >
              다음
            </Button>
          </div>
>>>>>>> dev
        </>
      )}
    </Container>
  );
}

export default AlertList;
