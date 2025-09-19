import { useState } from 'react';
import './App.css';
import logo from "./assets/logo.png";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_KEY = "07uZJSzMLx4PjUbYsaJ7D9dk43dZTOUg";

  const search = async () => {
    if (!searchTerm.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/df/auction?itemName=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }
      
      const data = await response.json();
      const results = data.rows || [];
      
      // 개당 가격이 낮은 순으로 정렬
      const sortedResults = results.sort((a, b) => {
        const pricePerUnitA = a.currentPrice / a.count;
        const pricePerUnitB = b.currentPrice / b.count;
        return pricePerUnitA - pricePerUnitB;
      });
      
      setSearchResults(sortedResults);
      
      if (data.rows && data.rows.length === 0) {
        alert('검색 결과가 없습니다.');
      }
    } catch (err) {
      setError(err.message);
      console.error('검색 오류:', err);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='header'>
        <button className='menu-item'>경매장 검색</button>
        <button className='menu-item'>아이템 목록</button>
      </div>
      <div className='content'>
        <div className="main-logo"> 
          <img src={logo} alt="메인 로고" />
        </div>
        <div className="search">
          <div className="search-area">
            <div className="search-box">
              <input 
                id='auction' 
                placeholder='경매장 검색' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); search(); } }}
                disabled={loading}
              />
            </div>
            <div className="search-btn">
              <button onClick={search} disabled={loading}>
                {loading ? '검색 중...' : '검색'}
              </button>
            </div>  
          </div>

          <div className="search-recent">
            최근 검색
          </div>
          
          {/* 검색 결과 표시 */}
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>검색 결과 ({searchResults.length}개)</h3>
              <div className="results-grid">
                {searchResults.map((item, index) => (
                  <div key={index} className="result-item">
                    <div className="item-name">{item.itemName}</div>
                    <div className="item-info">
                      <div>등록일: {item.regDate}</div>
                      <div>수량: {item.count.toLocaleString()}</div>
                      <div>가격: {item.currentPrice?.toLocaleString()} 골드</div>
                      <div>개당 가격: {item.currentPrice/item.count} 골드</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              오류: {error}
            </div>
          )}
          

        </div>
      </div>
    </>  
  );
}

export default App;