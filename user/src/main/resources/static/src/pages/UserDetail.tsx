import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserDetail } from '../api/userApi';
import type { User } from '../api/userApi';
import { Container, Card, Button, Loading } from '@bookstore/common-ui';
import './UserDetail.css';

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

    if (loading) {
        return (
            <Container maxWidth="md" className="user-detail">
                <div className="user-detail__loading">
                    <Loading size="lg" text="사용자 정보를 불러오는 중..." />
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" className="user-detail">
                <div className="user-detail__error">
                    <p className="user-detail__error-message">{error}</p>
                    <div className="user-detail__error-actions">
                        <Button variant="primary" onClick={() => loadUser(id!)}>
                            다시 시도
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/')}>
                            목록으로
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container maxWidth="md" className="user-detail">
                <div className="user-detail__empty">
                    <p>사용자 정보가 없습니다.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        목록으로
                    </Button>
                </div>
            </Container>
        );
    }

    const renderAvatar = () => {
        const initial = user.userName.charAt(0).toUpperCase();
        return (
            <div className="user-detail__avatar">
                <span className="user-detail__avatar-initial">{initial}</span>
            </div>
        );
    };

    return (
        <Container maxWidth="md" className="user-detail">
            <div className="user-detail__header">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/')}
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    }
                >
                    목록으로
                </Button>
            </div>

            <Card variant="elevated" padding="lg" className="user-detail__card">
                <div className="user-detail__profile">
                    {renderAvatar()}
                    <div className="user-detail__profile-info">
                        <h2 className="user-detail__name">{user.userName}</h2>
                        {user.nickName && user.nickName !== user.userName && (
                            <p className="user-detail__nickname">@{user.nickName}</p>
                        )}
                        <p className="user-detail__email">{user.email}</p>
                    </div>
                </div>

                {user.profile && (
                    <div className="user-detail__section">
                        <h3 className="user-detail__section-title">프로필</h3>
                        <p className="user-detail__bio">{user.profile}</p>
                    </div>
                )}

                <div className="user-detail__section">
                    <h3 className="user-detail__section-title">계정 정보</h3>
                    <div className="user-detail__info-grid">
                        <div className="user-detail__info-item">
                            <span className="user-detail__info-label">사용자 ID</span>
                            <span className="user-detail__info-value">{user.id}</span>
                        </div>
                        {user.createdAt && (
                            <div className="user-detail__info-item">
                                <span className="user-detail__info-label">가입일</span>
                                <span className="user-detail__info-value">
                                    {new Date(user.createdAt).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </Container>
    );
}

export default UserDetail;
