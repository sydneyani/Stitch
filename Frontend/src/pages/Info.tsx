// src/pages/Info.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Info.css';

const Info: React.FC = () => {
  return (
    <div className="Info">
      <h1>Welcome to $titch</h1>
      <p>Here you can find information about how to get paid to watch your favorite streamers.</p>
      <Link to="/" className="Back-link">Back to Home</Link>
    </div>
  );
}

export default Info;
