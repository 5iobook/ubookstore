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
            console.error('?�시리스??목록 조회 ?�패:', err);
            setError('?�시리스??목록??불러?�는???�패?�습?�다.');
        } finally {
            setLoading(false);
        }
    }

    return (

        <Container maxWidth="xl" className="wish-list">
            <header className="wish-list__header">
                <h1 className="wish-list__title">?�시리스??목록</h1>
                <p className="wish-list__subtitle">관???�는 ?�서�??�인?�세??/p>
            </header>
            
            {loading && (
                <div className="wish-list__loading" role="status" aria-live="polite">
                    <Loading size="lg" text="?�시리스??목록??불러?�는 �?.." />
                </div>
            )}
            
            {error && (
                <div className="wish-list__error" role="alert" aria-live="assertive">
                    <p className="wish-list__error-message">{error}</p>
                    <Button variant="primary" onClick={loadWishes}>
                        ?�시 ?�도
                    </Button>
                </div>
            )}
            
            {!loading && !error && wishes.length === 0 && (
                <div className="wish-list__empty" role="status">
                    <p>?�시리스?��? 비어?�습?�다.</p>
                </div>
            )}
            
            {!loading && !error && wishes.length > 0 && (
                <>
                    <section aria-label="?�시리스??목록 ?�이�? className="wish-list__table">

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>?�용??ID</th>
                                    <th>게시글 ID</th>
                                    <th>?�성??/th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishes.map((wish) => (
                                    <tr key={wish.id}>
                                        <td>{wish.id}</td>

                                        <td className="wish-user-id">{wish.userId}</td>
                                        <td className="wish-post-id">{wish.postId}</td>
                                        <td className="wish-date">
                                            {new Date(wish.createdAt).toLocaleString()}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </section>
                    
                    <Pagination
                        currentPage={page + 1}
                        totalPages={totalPages}
                        totalItems={totalPages > 0 ? (totalPages - 1) * size + wishes.length : 0}
                        itemsPerPage={size}
                        onPageChange={(newPage) => setPage(newPage - 1)}
                        showInfo={true}
                    />

                </>
            )}
        </Container>
    );
}

export default WishList;
