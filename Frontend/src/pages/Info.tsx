import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Info.css';

interface Streamer {
  id: string;
  user_name: string;
  viewer_count: number;
  is_live: boolean;
  thumbnail_url: string;
  title: string;
}

interface User {
  display_name: string;
  profile_image_url: string;
}

const Info: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStreamers = async () => {
      try {
        const response = await axios.get('https://api.twitch.tv/helix/streams', {
          headers: {
            'Client-ID': 'wgp4pcigettkv18ljb9nmp3km3tebq', // Replace with your actual Client ID
            'Authorization': 'Bearer 3kf85oqx9f1n7nhchko2ecuh6x9f45' // Replace with your actual OAuth token
          },
          params: {
            first: 40,
            language: 'en' // Fetch streams in English
          }
        });
        const filteredStreamers = response.data.data.filter((streamer: any) => streamer.viewer_count > 5000);
        setStreamers(filteredStreamers);
      } catch (error) {
        console.error('Error fetching streamers:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-ID': 'wgp4pcigettkv18ljb9nmp3km3tebq', // Replace with your actual Client ID
            'Authorization': 'Bearer 3kf85oqx9f1n7nhchko2ecuh6x9f45' // Replace with your actual OAuth token
          }
        });
        setUser(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchStreamers();
    fetchUser();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const topStreamer = streamers.length > 0 ? streamers[0] : null;
  const recommendedStreamers = streamers.slice(1); // Assuming top recommended

  // Add placeholders to make the count a multiple of 3
  while (recommendedStreamers.length % 3 !== 0) {
    recommendedStreamers.push({
      id: `placeholder-${recommendedStreamers.length}`,
      user_name: '',
      viewer_count: 0,
      is_live: false,
      thumbnail_url: '',
      title: ''
    });
  }

  const handleStreamerClick = (streamerUserName: string) => {
    // const paymentCompleted = sessionStorage.getItem('paymentCompleted');
    
    // if (paymentCompleted) {
        // If the payment is completed, go directly to the streamer's page
        navigate(`/stream/${streamerUserName}`);
    // } else {
        // Otherwise, navigate to the Buy page
        // navigate(`/buy?streamer=${streamerUserName}`);
    // }
};


  return (
    <div className="Info">
      <nav className="navbar">
        <Link to="/">
          <img src="/images/stitch-logo.png" alt="$titch Logo" className="logo" />
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for live streamers..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {user && (
          <div className="user-info">
            <img src={user.profile_image_url} alt="Profile" className="profile-pic" />
            <span>{user.display_name}</span>
          </div>
        )}
      </nav>
      <div className="content">
        {topStreamer && (
          <div className="top-streamer" onClick={() => handleStreamerClick(topStreamer.user_name)}>
            <h2>Top Live Streamer</h2>
            <div className="thumbnail-wrapper">
              <div className="thumbnail-container">
                <img className="top-streamer-img" src={topStreamer.thumbnail_url.replace('{width}', '320').replace('{height}', '180')} alt={topStreamer.title} />
                <div className="streamer-name">{topStreamer.user_name}</div>
              </div>
            </div>
            <p>{topStreamer.title}</p>
            <p>{formatNumber(topStreamer.viewer_count)} viewers</p>
          </div>
        )}
        <div className="recommended-streamers">
          <h2>Recommended Streamers</h2>
          <div className="streamer-list">
            {recommendedStreamers.map((streamer) => (
              <div key={streamer.id} className={`streamer ${streamer.user_name ? '' : 'placeholder'}`} onClick={() => handleStreamerClick(streamer.user_name)}>
                <div className="thumbnail-wrapper">
                  <div className="thumbnail-container">
                    {streamer.thumbnail_url && (
                      <img className="recommended-streamer-img" src={streamer.thumbnail_url.replace('{width}', '320').replace('{height}', '180')} alt={streamer.title} />
                    )}
                    <div className="streamer-name">{streamer.user_name}</div>
                  </div>
                </div>
                <p>{streamer.title}</p>
                <p>{formatNumber(streamer.viewer_count)} viewers</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
