import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserListPage } from '../api/userApi';
import type { User } from '../api/userApi';

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const size = 10;

    useEffect(() => {
        loadUsers();
    }, [page]);

    async function loadUsers() {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUserListPage(page, size);
            setUsers(data.items);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('사용자 목록 조회 실패:', err);
            setError('사용자 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>사용자 목록</h2>
            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>사용자명</th>
                                <th>이메일</th>
                                <th>생성일</th>
                                <th>상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                                    <td>
                                        <Link to={`/user/${user.id}`} style={{ color: '#1976d2' }}>
                                            보기
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

export default UserList;
