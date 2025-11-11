import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const BookForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // 검색어를 URL 파라미터로 전달하여 목록 페이지로 이동
      navigate(`/?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      <h2>도서 검색</h2>
      <p style={{color: '#666', marginBottom: '20px'}}>
        Naver Book Search API를 사용하여 도서를 검색합니다.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">검색어:</label>
          <input 
            className="form-input" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="책 제목, 저자, 출판사 등을 입력하세요"
            required 
          />
        </div>
        <button type="submit">검색</button>
      </form>
      <div style={{marginTop: '30px', padding: '15px', background: '#f0f4f8', borderRadius: '8px'}}>
        <h3 style={{marginTop: 0, color: '#1976d2'}}>💡 검색 팁</h3>
        <ul style={{lineHeight: '1.8'}}>
          <li>책 제목, 저자명, 출판사명으로 검색할 수 있습니다</li>
          <li>여러 단어를 입력하면 AND 검색이 됩니다</li>
          <li>예: "스프링 부트", "이펙티브 자바", "마틴 파울러" 등</li>
        </ul>
      </div>
    </div>
  );
};

export default BookForm;
