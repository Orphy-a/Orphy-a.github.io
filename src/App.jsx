import { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <>
      <div className='header'>
        <button className='menu-item'>캐릭터 검색</button>
        <button className='menu-item'>검색</button>
        <button className='menu-item'>검색</button>
      </div>
      <div className='content'>
        <div className="main-logo">
          로고 이미지
        </div>
        <div className="search">
          <div className="search-area">
            <div className="search-box">
              <input></input>
            </div>
            <div className="search-btn">
              <button>검색 버튼</button>
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
