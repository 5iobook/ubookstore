import React, { useState } from 'react';
import { createTrade } from '../api/tradeApi';
import '../App.css';

const TradeForm: React.FC = () => {
  const [buyerId, setBuyerId] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [postId, setPostId] = useState('');
  const [meetUpLocation, setMeetUpLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createTrade({ buyerId, sellerId, postId, meetUpLocation });
      setSuccess(true);
    } catch {
      setError('거래 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>거래 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">구매자 ID:</label>
          <input className="form-input" value={buyerId} onChange={e => setBuyerId(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">판매자 ID:</label>
          <input className="form-input" value={sellerId} onChange={e => setSellerId(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">게시글 ID:</label>
          <input className="form-input" value={postId} onChange={e => setPostId(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">만남 장소:</label>
          <input className="form-input" value={meetUpLocation} onChange={e => setMeetUpLocation(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>등록</button>
      </form>
      {loading && <div>등록 중...</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>거래가 등록되었습니다!</div>}
    </div>
  );
};

export default TradeForm; 