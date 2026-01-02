import { useEffect, useState } from 'react';
import { Container, Button, Loading, Pagination } from '@bookstore/common-ui';
import { fetchWishListPage } from '../api/wishApi';
import type { Wish } from '../api/wishApi';
import './WishList.css';

function WishList() {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const size = 10;

    useEffect(() => {
        loadWishes();
    }, [page]);

    async function loadWishes() {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWishListPage(page, size);
            setWishes(data.items);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('위시리스트 목록 조회 실패:', err);
            setError('위시리스트 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
<<<<<<< HEAD
        <Container maxWidth="xl" className="wish-list">
            <header className="wish-list__header">
                <h1 className="wish-list__title">위시리스트 목록</h1>
                <p className="wish-list__subtitle">관심 있는 도서를 확인하세요</p>
            </header>
            
            {loading && (
                <div className="wish-list__loading" role="status" aria-live="polite">
                    <Loading size="lg" text="위시리스트 목록을 불러오는 중..." />
                </div>
            )}
            
            {error && (
                <div className="wish-list__error" role="alert" aria-live="assertive">
                    <p className="wish-list__error-message">{error}</p>
                    <Button variant="primary" onClick={loadWishes}>
                        다시 시도
                    </Button>
                </div>
            )}
            
            {!loading && !error && wishes.length === 0 && (
                <div className="wish-list__empty" role="status">
                    <p>위시리스트가 비어있습니다.</p>
                </div>
            )}
            
            {!loading && !error && wishes.length > 0 && (
                <>
                    <section aria-label="위시리스트 목록 테이블" className="wish-list__table">
=======
        <div className="wish-list">
            <div className="wish-list__header">
                <h2 className="wish-list__title">위시리스트 목록</h2>
                <p className="wish-list__subtitle">관심 있는 도서를 확인하세요</p>
            </div>
            
            {loading && <div className="wish-list__loading">로딩 중...</div>}
            {error && <div className="wish-list__error-message">{error}</div>}
            {!loading && !error && (
                <>
                    <div className="wish-list__table">
>>>>>>> dev
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>사용자 ID</th>
                                    <th>게시글 ID</th>
                                    <th>생성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishes.map((wish) => (
                                    <tr key={wish.id}>
                                        <td>{wish.id}</td>
<<<<<<< HEAD
                                        <td className="wish-user-id">{wish.userId}</td>
                                        <td className="wish-post-id">{wish.postId}</td>
                                        <td className="wish-date">
                                            {new Date(wish.createdAt).toLocaleString()}
                                        </td>
=======
                                        <td>{wish.userId}</td>
                                        <td>{wish.postId}</td>
                                        <td>{new Date(wish.createdAt).toLocaleString()}</td>
>>>>>>> dev
                                    </tr>
                                ))}
                            </tbody>
                        </table>
<<<<<<< HEAD
                    </section>
                    
                    <Pagination
                        currentPage={page + 1}
                        totalPages={totalPages}
                        totalItems={totalPages > 0 ? (totalPages - 1) * size + wishes.length : 0}
                        itemsPerPage={size}
                        onPageChange={(newPage) => setPage(newPage - 1)}
                        showInfo={true}
                    />
=======
                    </div>
                    
                    <div className="wish-list__pagination">
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
                        <div className="wish-list__pagination-info">
                            {page + 1} / {totalPages || 1}
                        </div>
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
>>>>>>> dev
                </>
            )}
        </Container>
    );
}

export default WishList;
