import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Stream.css';

interface User {
  display_name: string;
  profile_image_url: string;
}

const Stream: React.FC = () => {
  const { streamerUserName } = useParams<{ streamerUserName: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-ID': 'wgp4pcigettkv18ljb9nmp3km3tebq', // Replace with your actual Client ID
            'Authorization': 'Bearer di17r39rccpp1kh5whk9osp9rbz4xi' // Replace with your actual OAuth token
          }
        });
        setUser(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="Stream">
      <nav className="navbar">
        <Link to="/">
          <img src="/images/stitch-logo.png" alt="$titch Logo" className="logo" />
        </Link>
        <button className="back-button" onClick={() => navigate(-1)}>
  <span className="material-icons">exit_to_app</span>
</button>
        <p className="navbar-text">Watching {streamerUserName}</p>
        {user && (
          <div className="user-info">
            <img src={user.profile_image_url} alt="Profile" className="profile-pic" />
            <span>{user.display_name}</span>
          </div>
        )}
      </nav>
      <div className="stream-content">
        <iframe
          src={`https://player.twitch.tv/?channel=${streamerUserName}&parent=${window.location.hostname}`}
          height="480"
          width="854"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Stream;
