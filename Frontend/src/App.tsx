import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Info from './pages/Info.tsx';
import Buy from './pages/Buy.tsx';
import Stream from './pages/Stream.tsx';
import OAuthRedirect from './pages/OAuthRedirect.tsx';
import LinkedAccount from './pages/LinkedAccount.tsx';
import Pay from './pages/Pay.tsx'; // Import the new Pay component


const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('twitch_token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleJoinClick = () => {
    // Simply navigate to the /info page regardless of the login state
    navigate('/info');
  };

  return (
    <div className="App">
      {location.pathname === '/' && (
        <header className="App-header">
          <img src="/images/stitch-logo.png" alt="$titch Logo" className="App-logo" />
          <p className="App-tagline">Get Paid to Watch Streamers YOU Love!</p>
          <button onClick={handleJoinClick} className="Join-button">
            Join
          </button>
        </header>
      )}
      {location.pathname === '/' && !isLoggedIn && (
        <div className="background">
          <div className="carousel top">
            <div className="carousel-track">
              <img src="/images/streamer6.png" alt="Streamer 1" />
              <img src="/images/streamer2.png" alt="Streamer 2" />
              <img src="/images/streamer1.png" alt="Streamer 3" />
            </div>
          </div>
          <div className="carousel bottom">
            <div className="carousel-track">
              <img src="/images/streamer4.png" alt="Streamer 4" />
              <img src="/images/streamer5.png" alt="Streamer 5" />
              <img src="/images/streamer3.png" alt="Streamer 6" />
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/info" element={<Info />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/stream/:streamerUserName" element={<Stream />} />
        <Route path="/oauth-redirect" element={<OAuthRedirect />} />
        <Route path="/linked-account" element={<LinkedAccount />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </div>
  );
};

export default App;
