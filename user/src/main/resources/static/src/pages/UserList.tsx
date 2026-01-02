import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserListPage } from '../api/userApi';
import type { User } from '../api/userApi';

import { Container, Grid, UserCard, Button, Loading, Pagination } from '@bookstore/common-ui';

import './UserList.css';

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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
            console.error('?¬ìš©??ëª©ë¡ ì¡°íšŒ ?¤íŒ¨:', err);
            setError('?¬ìš©??ëª©ë¡??ë¶ˆëŸ¬?¤ëŠ”???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
        } finally {
            setLoading(false);
        }
    }

    const handleUserClick = (userId: string) => {
        navigate(`/user/${userId}`);
    };

    return (
        <Container maxWidth="xl" className="user-list">
            <header className="user-list__header">
                <h1 className="user-list__title">?¬ìš©??ëª©ë¡</h1>
                <p className="user-list__subtitle" aria-live="polite">
                    ì´?{totalPages > 0 ? (totalPages - 1) * size + users.length : 0}ëª…ì˜ ?¬ìš©??
                </p>
            </header>

            {loading && (
                <div className="user-list__loading" role="status" aria-live="polite">
                    <Loading size="lg" text="?¬ìš©??ëª©ë¡??ë¶ˆëŸ¬?¤ëŠ” ì¤?.." />
                </div>
            )}

            {error && (
                <div className="user-list__error" role="alert" aria-live="assertive">
                    <p className="user-list__error-message">{error}</p>
                    <Button variant="primary" onClick={loadUsers}>
                        ?¤ì‹œ ?œë„
                    </Button>
                </div>
            )}

            {!loading && !error && users.length === 0 && (
                <div className="user-list__empty" role="status">
                    <p>?±ë¡???¬ìš©?ê? ?†ìŠµ?ˆë‹¤.</p>
                </div>
            )}

            {!loading && !error && users.length > 0 && (
                <>
                    <section aria-label="?¬ìš©??ì¹´ë“œ ëª©ë¡">
                        <Grid columns={12} gap="md" responsive className="user-list__grid">
                            {users.map((user) => (
                                <Grid.Item key={user.id} span={12} spanMd={6} spanLg={4}>
                                    <UserCard
                                        id={String(user.id)}
                                        name={user.userName}
                                        email={user.email}
                                        bio={user.profile}
                                        variant="detailed"
                                        onCardClick={() => handleUserClick(String(user.id))}
                                    />
                                </Grid.Item>
                            ))}
                        </Grid>
                    </section>


                    <Pagination
                        currentPage={page + 1}
                        totalPages={totalPages}
                        totalItems={totalPages > 0 ? (totalPages - 1) * size + users.length : 0}
                        itemsPerPage={size}
                        onPageChange={(newPage) => setPage(newPage - 1)}
                        showInfo={true}
                    />

                </>
            )}
        </Container>
    );
}

export default UserList;
