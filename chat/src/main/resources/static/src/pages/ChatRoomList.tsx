import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchChatRoomListPage, ChatRoom } from '../api/chatApi';

function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const size = 10;

  useEffect(() => {
    loadChatRooms();
  }, [page]);

  async function loadChatRooms() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchChatRoomListPage(page, size);
      setChatRooms(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('채팅방 목록 조회 실패:', err);
      setError('채팅방 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>채팅방 목록</h2>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>채팅방 이름</th>
                <th>참여자 수</th>
                <th>생성일</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {chatRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.name}</td>
                  <td>{room.participants.length}명</td>
                  <td>{new Date(room.createdAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/chat/${room.id}`}>
                      <button>입장</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20 }}>
            <button
              className="pagination-btn"
              onClick={() => setPage(0)}
              disabled={page === 0}
            >
              처음
            </button>
            <button
              className="pagination-btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              이전
            </button>
            <span style={{ margin: '0 10px' }}>
              {page + 1} / {totalPages || 1}
            </span>
            <button
              className="pagination-btn"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              다음
            </button>
            <button
              className="pagination-btn"
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
            >
              마지막
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatRoomList;
