import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Input, Button, Loading } from '@bookstore/common-ui';
import { createWish } from '../api/wishApi';

function WishForm() {
    const navigate = useNavigate();
    const [postId, setPostId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!postId.trim()) {
            setError('게시글 ID를 입력해주세요.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createWish(postId);
            alert('위시리스트에 추가되었습니다.');
            navigate('/');
        } catch (err) {
            console.error('위시리스트 추가 실패:', err);
            setError('위시리스트 추가에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md">
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
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

            <header style={{
                marginBottom: 'var(--spacing-6)',
                textAlign: 'center'
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-neutral-900)'
                }}>
                    위시리스트 추가
                </h1>
                <p style={{
                    margin: 'var(--spacing-2) 0 0',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-size-base)'
                }}>
                    관심 있는 게시글을 위시리스트에 추가하세요
                </p>
            </header>

            <Card>
                {error && (
                    <div style={{
                        padding: 'var(--spacing-3)',
                        backgroundColor: 'var(--color-error-50)',
                        border: '1px solid var(--color-error-200)',
                        borderRadius: 'var(--radius-base)',
                        marginBottom: 'var(--spacing-4)',
                        color: 'var(--color-error-700)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
                        <Input
                            label="게시글 ID (UUID)"
                            placeholder="예: 550e8400-e29b-41d4-a716-446655440000"
                            value={postId}
                            onChange={(value) => setPostId(value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 'var(--spacing-3)',
                        marginTop: 'var(--spacing-6)',
                        paddingTop: 'var(--spacing-4)',
                        borderTop: '1px solid var(--border-secondary)'
                    }}>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? '추가 중...' : '위시리스트 추가'}
                        </Button>
                    </div>
                </form>

                {loading && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 'var(--spacing-4)',
                        marginTop: 'var(--spacing-4)'
                    }}>
                        <Loading size="md" text="위시리스트에 추가하는 중..." />
                    </div>
                )}
            </Card>
        </Container>
    );
}

export default WishForm;
