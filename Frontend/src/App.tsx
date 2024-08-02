// src/App.tsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Info from './pages/Info';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <img src="/images/stitch-logo.png" alt="$titch Logo" className="App-logo" />
        <p className="App-tagline">Get Paid to Watch Streamers YOU Love!</p>
        <Link to="/info" className="Join-button">Join</Link>
      </header>
      {location.pathname === '/' && (
        <div className="background">
          <div className="carousel top">
            <div className="carousel-track">
              <img src="/images/streamer1.png" alt="Streamer 1" />
              <img src="/images/streamer2.png" alt="Streamer 2" />
              <img src="/images/streamer3.png" alt="Streamer 3" />
              {/* Add more images as needed */}
            </div>
          </div>
          <div className="carousel bottom">
            <div className="carousel-track">
              <img src="/images/streamer4.png" alt="Streamer 4" />
              <img src="/images/streamer5.png" alt="Streamer 5" />
              <img src="/images/streamer6.png" alt="Streamer 6" />
              {/* Add more images as needed */}
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;
