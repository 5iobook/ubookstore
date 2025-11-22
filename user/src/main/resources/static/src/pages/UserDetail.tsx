import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserDetail } from '../api/userApi';
import type { User } from '../api/userApi';

function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        loadUser(id);
    }, [id]);

    async function loadUser(userId: string) {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUserDetail(userId);
            setUser(data);
        } catch (err) {
            console.error('사용자 상세 조회 실패:', err);
            setError('사용자 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!user) return <div>사용자 정보가 없습니다.</div>;

    return (
        <div>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginBottom: 16,
                    padding: '6px 16px',
                    borderRadius: 4,
                    border: '1px solid #1976d2',
                    background: '#1976d2',
                    color: '#fff',
                    cursor: 'pointer'
                }}
            >
                ← 목록으로
            </button>
            <h2>사용자 상세</h2>
            <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>사용자명:</strong> {user.userName}</p>
                <p><strong>닉네임:</strong> {user.nickName || '-'}</p>
                <p><strong>이메일:</strong> {user.email}</p>
                <p><strong>프로필:</strong> {user.profile || '-'}</p>
                {user.createdAt && <p><strong>생성일:</strong> {new Date(user.createdAt).toLocaleString()}</p>}
            </div>
        </div>
    );
}

export default UserDetail;
