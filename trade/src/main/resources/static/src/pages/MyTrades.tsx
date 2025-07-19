import React from 'react';

const myMockTrades = [
  { id: 1, title: '자바의 정석', price: 12000, status: '판매중', createdAt: '2024-06-01' },
  { id: 3, title: '영어 회화책', price: 9000, status: '판매중', createdAt: '2024-05-30' },
];

const MyTrades: React.FC = () => {
  return (
    <div>
      <h2>내 거래 목록</h2>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>가격</th>
            <th>상태</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {myMockTrades.map(trade => (
            <tr key={trade.id}>
              <td>{trade.title}</td>
              <td>{trade.price.toLocaleString()}원</td>
              <td>{trade.status}</td>
              <td>{trade.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTrades; 