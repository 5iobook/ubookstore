import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyInfo } from '../api/userApi';
import type { User } from '../api/userApi';
import axios from 'axios';

function MyPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadUserInfo();
    }, []);

    async function loadUserInfo() {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            setError('로그인이 필요합니다.');
            setLoading(false);
            return;
        }

        // axios 기본 헤더에 토큰 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setLoading(true);
        setError(null);
        try {
            const data = await fetchMyInfo();
            setUser(data);
        } catch (err: any) {
            console.error('사용자 정보 조회 실패:', err);
            if (err.response?.status === 401) {
                setError('인증이 만료되었습니다. 다시 로그인해주세요.');
                localStorage.removeItem('accessToken');
                delete axios.defaults.headers.common['Authorization'];
            } else {
                setError('사용자 정보를 불러오는데 실패했습니다.');
            }
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        alert('로그아웃되었습니다.');
        navigate('/');
        window.location.reload(); // 네비게이션 상태 업데이트
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>로딩 중...</div>;

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p style={{ color: 'red', fontSize: '1.1rem' }}>{error}</p>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: 20,
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 24px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    로그인 페이지로
                </button>
            </div>
        );
    }

    if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>사용자 정보가 없습니다.</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '30px' }}>마이페이지</h2>
            <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '8px' }}>
                        사용자명
                    </label>
                    <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '6px' }}>
                        {user.userName}
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '8px' }}>
                        닉네임
                    </label>
                    <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '6px' }}>
                        {user.nickName || '-'}
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '8px' }}>
                        이메일
                    </label>
                    <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '6px' }}>
                        {user.email}
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '8px' }}>
                        프로필
                    </label>
                    <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '6px' }}>
                        {user.profile || '-'}
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: '#d32f2f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '12px 32px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
