import './App.css';
import logo from "./assets/logo.png";

function App() {
  
  const search = ()=>{
    const auction =document.querySelector("#auction").value;
    
    console.log('auction:', auction);
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
              <input id='auction' placeholder='경매장 검색' onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); search(); } }}></input>
            </div>
            <div className="search-btn">
              <button onClick={search}>검색 버튼</button>
            </div>  
          </div>
          <div className="search-recent">
            최근 검색
          </div>
        </div>
      </div>
    </>  
  );
}

export default App;
