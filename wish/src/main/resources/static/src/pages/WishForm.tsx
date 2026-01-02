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
            setError('ê²Œì‹œê¸€ IDë¥??…ë ¥?´ì£¼?¸ìš”.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createWish(postId);
            alert('?„ì‹œë¦¬ìŠ¤?¸ì— ì¶”ê??˜ì—ˆ?µë‹ˆ??');
            navigate('/');
        } catch (err) {
            console.error('?„ì‹œë¦¬ìŠ¤??ì¶”ê? ?¤íŒ¨:', err);
            setError('?„ì‹œë¦¬ìŠ¤??ì¶”ê????¤íŒ¨?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.');
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
                    ëª©ë¡?¼ë¡œ
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
                    ?„ì‹œë¦¬ìŠ¤??ì¶”ê?
                </h1>
                <p style={{
                    margin: 'var(--spacing-2) 0 0',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-size-base)'
                }}>
                    ê´€???ˆëŠ” ê²Œì‹œê¸€???„ì‹œë¦¬ìŠ¤?¸ì— ì¶”ê??˜ì„¸??
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
                            label="ê²Œì‹œê¸€ ID (UUID)"
                            placeholder="?? 550e8400-e29b-41d4-a716-446655440000"
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
                            ì·¨ì†Œ
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? 'ì¶”ê? ì¤?..' : '?„ì‹œë¦¬ìŠ¤??ì¶”ê?'}
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
                        <Loading size="md" text="?„ì‹œë¦¬ìŠ¤?¸ì— ì¶”ê??˜ëŠ” ì¤?.." />
                    </div>
                )}
            </Card>
        </Container>

    );
}

export default WishForm;
