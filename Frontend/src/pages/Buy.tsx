import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Buy.css';
import axios from 'axios';

const Buy: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [streamer, setStreamer] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const streamerName = params.get('streamer');
    if (plan) {
      setSelectedPlan(plan);
    }
    if (streamerName) {
      setStreamer(streamerName);
      sessionStorage.setItem('selectedStreamer', streamerName); // Store the streamer name in sessionStorage
    }

    const fetchUserInfo = async () => {
      const token = sessionStorage.getItem('titch_token');
      if (token) {
        try {
          const response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Client-ID': 'wgp4pcigettkv18ljb9nmp3km3tebq',
            },
          });
          setUser(response.data.data[0]);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [location]);

  const handlePlanSelect = (plan: string) => {
    const token = sessionStorage.getItem('titch_token');
    if (token) {
      navigate(`/pay?plan=${plan}`);
    } else {
      handleLinkTwitch(plan);
    }
  };

  const handleLinkTwitch = (plan: string) => {
    const clientId = 'wgp4pcigettkv18ljb9nmp3km3tebq';
    const redirectUri = `${window.location.origin}/oauth-redirect`;
    const scopes = 'user:read:email';

    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scopes}`;
  };

  return (
    <div className="Buy">
      <nav className="navbar">
        <Link to="/">
          <img src="/images/stitch-logo.png" alt="$titch Logo" className="logo" />
        </Link>
        <p className="navbar-text">EARN money by supporting your favorite STREAMER!</p>
        {user && (
          <div className="user-info">
            <img src={user.profile_image_url} alt="Profile" className="profile-pic" />
            <span>{user.display_name}</span>
          </div>
        )}
      </nav>
      <div className="buy-content">
        <h1>Sign Up for our Subscription Plans and EARN cashback weekly!</h1>
        <div className="plans">
          <div className="plan silver" onClick={() => handlePlanSelect('Basic')}>
            <h2>Basic Plan</h2>
            <ul>
              <li>Monthly Fee: $10</li>
              <li>Cashback: 10% on donations and gifted subs</li>
              <li>Perks: 1 Free Gifted Sub for ANY streamer</li>
            </ul>
            <p className="example">
              Example: Donate 10 subs ($49.90) and earn 10% cashback = $4.99
            </p>
          </div>
          <div className="plan purple" onClick={() => handlePlanSelect('Premium')}>
            <h2>Premium Plan</h2>
            <ul>
              <li>Monthly Fee: $20</li>
              <li>Cashback: 15% on donations and gifted subs</li>
              <li>Perks: 5 Free Gifted Subs for ANY streamer</li>
              <li>Earn additional cash JUST by watching streams</li>
            </ul>
            <p className="example">
              Example: Donate 20 subs ($99.80) and earn 15% cashback = $14.97
            </p>
          </div>
          <div className="plan gold" onClick={() => handlePlanSelect('VIP')}>
            <h2>VIP Plan</h2>
            <ul>
              <li>Monthly Fee: $50</li>
              <li>Cashback: 20% on donations and gifted subs</li>
              <li>Perks: 10 Free Gifted Subs for ANY streamer</li>
              <li>Earn 2x cash JUST by watching streams</li>
            </ul>
            <p className="example">
              Example: Donate 50 subs ($249.50) and earn 20% cashback = $49.90
            </p>
          </div>
        </div>
        <div className="info-section">
          <h1>Here's How It Works:</h1>
          <ul>
            <li>Get cashback on your donations</li>
            <li>We support you supporting them</li>
            <li>Watch and Earn</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Buy;
