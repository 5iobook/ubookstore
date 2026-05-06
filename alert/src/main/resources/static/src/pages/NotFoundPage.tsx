import { useNavigate } from 'react-router-dom';
import { Button } from '@bookstore/common-ui';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 20px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '72px', margin: '0', color: '#FF9F43' }}>404</h1>
      <h2 style={{ fontSize: '24px', margin: '20px 0' }}>페이지를 찾을 수 없습니다</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Button 
        onClick={() => navigate('/')}
        variant="primary"
        size="lg"
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
}
