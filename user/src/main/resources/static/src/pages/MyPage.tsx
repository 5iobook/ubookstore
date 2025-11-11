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
    }

    if (loading) return <div>로딩 중...</div>;
    
    if (error) {
        return (
            <div>
                <p style={{ color: 'red' }}>{error}</p>
                <button onClick={() => navigate('/')}>로그인 페이지로</button>
            </div>
        );
    }
    
    if (!user) return <div>사용자 정보가 없습니다.</div>;

    return (
        <div>
            <h2>마이페이지</h2>
            <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
                <p><strong>사용자명:</strong> {user.userName}</p>
                <p><strong>닉네임:</strong> {user.nickName || '-'}</p>
                <p><strong>이메일:</strong> {user.email}</p>
                <p><strong>프로필:</strong> {user.profile || '-'}</p>
            </div>
            <button onClick={handleLogout} style={{ marginTop: 20 }}>
                로그아웃
            </button>
        </div>
    );
}

export default MyPage;
