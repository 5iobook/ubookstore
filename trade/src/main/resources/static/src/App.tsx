import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TradeList from './pages/TradeList';
import TradeDetail from './pages/TradeDetail';
import TradeForm from './pages/TradeForm';
import MyTrades from './pages/MyTrades';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>거래 목록</Link>
        {/* <Link to="/trade/:id" style={{ marginRight: 10 }}>거래 상세(예시)</Link> */}
        <Link to="/trade/new" style={{ marginRight: 10 }}>거래 등록</Link>
        <Link to="/my-trades">내 거래</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TradeList />} />
        <Route path="/trade/:id" element={<TradeDetail />} />
        <Route path="/trade/new" element={<TradeForm />} />
        <Route path="/my-trades" element={<MyTrades />} />
      </Routes>
    </Router>
  );
}

export default App;
