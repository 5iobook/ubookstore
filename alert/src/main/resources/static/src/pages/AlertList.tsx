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

  // ???åÎ¶º ?ùÏÑ± ??
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
      console.error('?åÎ¶º Î™©Î°ù Ï°∞Ìöå ?§Ìå®:', err);
      setError('?åÎ¶º Î™©Î°ù??Î∂àÎü¨?§Îäî???§Ìå®?àÏäµ?àÎã§.');
    } finally {
      setLoading(false);
    }
  }

  function handleCreateAlert() {
    if (!message.trim()) {
      alert('Î©îÏãúÏßÄÎ•??ÖÎ†•?¥Ï£º?∏Ïöî.');
      return;
    }

    setLoading(true);
    setError(null);
    createAlert({ userId, message, type })
      .then(() => {
        alert('?åÎ¶º???ùÏÑ±?òÏóà?µÎãà??');
        setMessage('');
        setPage(0);
        loadAlerts();
      })
      .catch((err) => {
        console.error('?åÎ¶º ?ùÏÑ± ?§Ìå®:', err);
        setError('?åÎ¶º ?ùÏÑ±???§Ìå®?àÏäµ?àÎã§.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading && alerts.length === 0) {
    return <div className="alert-list__loading"><Loading size="lg" text="?åÎ¶º Î™©Î°ù??Î∂àÎü¨?§Îäî Ï§?.." /></div>;
  }

  if (loading && alerts.length === 0) {
    return <div className="alert-list__loading"><Loading size="lg" text="?åÎ¶º Î™©Î°ù??Î∂àÎü¨?§Îäî Ï§?.." /></div>;
  }

  return (

    <Container maxWidth="xl" className="alert-list">
      <header className="alert-list__header">
        <h1 className="alert-list__title">?åÎ¶º Î™©Î°ù</h1>
        <p className="alert-list__subtitle">?úÏä§???åÎ¶ºÍ≥?Î©îÏãúÏßÄÎ•??ïÏù∏?òÏÑ∏??/p>
      </header>
      
      <Card className="alert-list__create-form">
        <h3>???åÎ¶º ?ùÏÑ±</h3>
        <div className="alert-list__form-fields">
          <div className="alert-list__form-field">

            <Input
              label="?¨Ïö©??ID"
              type="text"
              value={userId}
              onChange={(value) => setUserId(value)}
              placeholder="?¨Ïö©??ID ?ÖÎ†•"
            />
          </div>

          <div className="alert-list__form-field">
            <label htmlFor="type" className="alert-list__form-label">

              ?Ä??
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
              label="Î©îÏãúÏßÄ"
              type="text"
              placeholder="?åÎ¶º Î©îÏãúÏßÄ ?ÖÎ†•"
              value={message}
              onChange={(value) => setMessage(value)}
            />
          </div>
          <Button 
            onClick={handleCreateAlert} 
            disabled={loading}
            variant="primary"
          >
            ?åÎ¶º ?ùÏÑ±
          </Button>
        </div>
      </Card>


      <p className="alert-list__count" aria-live="polite">
        Ï¥?{totalElements}Í∞úÏùò ?åÎ¶º
      </p>

      {error && (
        <div className="alert-list__error" role="alert" aria-live="assertive">
          <p className="alert-list__error-message">{error}</p>
          <Button variant="primary" onClick={loadAlerts}>
            ?§Ïãú ?úÎèÑ
          </Button>
        </div>
      )}

      {loading && alerts.length === 0 && (
        <div className="alert-list__loading" role="status" aria-live="polite">
          <Loading size="lg" text="?åÎ¶º Î™©Î°ù??Î∂àÎü¨?§Îäî Ï§?.." />
        </div>
      )}

      {!loading && !error && alerts.length === 0 && (
        <div className="alert-list__empty" role="status">
          <p>?åÎ¶º???ÜÏäµ?àÎã§.</p>
        </div>
      )}

      {!loading && !error && alerts.length > 0 && (
        <>
          <section aria-label="?åÎ¶º Î™©Î°ù ?åÏù¥Î∏? className="alert-list__table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>?¨Ïö©??ID</th>
                  <th>Î©îÏãúÏßÄ</th>
                  <th>?Ä??/th>
                  <th>?ΩÏùå ?¨Î?</th>
                  <th>?ùÏÑ±??/th>
                  <th>?°ÏÖò</th>
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
                        {alert.isRead ? '???ΩÏùå' : '???àÏùΩ??}
                      </span>
                    </td>
                    <td className="alert-date">
                      {new Date(alert.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <Link to={`/alert/${alert.id}`}>
                        <Button variant="outline" size="sm">
                          ?ÅÏÑ∏Î≥¥Í∏∞
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
