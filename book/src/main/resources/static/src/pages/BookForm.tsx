import React, { useState } from 'react';
import { createBook } from '../api/bookApi';
import '../App.css';

const BookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createBook({ 
        title, 
        author, 
        isbn, 
        price: Number(price), 
        stock: Number(stock) 
      });
      setSuccess(true);
      // 폼 초기화
      setTitle('');
      setAuthor('');
      setIsbn('');
      setPrice('');
      setStock('');
    } catch {
      setError('도서 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>도서 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">제목:</label>
          <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">저자:</label>
          <input className="form-input" value={author} onChange={e => setAuthor(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">ISBN:</label>
          <input className="form-input" value={isbn} onChange={e => setIsbn(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">가격:</label>
          <input className="form-input" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">재고:</label>
          <input className="form-input" type="number" value={stock} onChange={e => setStock(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>등록</button>
      </form>
      {loading && <div>등록 중...</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>도서가 등록되었습니다!</div>}
    </div>
  );
};

export default BookForm;
