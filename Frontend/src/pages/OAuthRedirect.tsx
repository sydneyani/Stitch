import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');
    console.log('Token received:', token);

    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get('plan');
    const streamer = searchParams.get('streamer');
    console.log('Plan received:', plan);
    console.log('Streamer received:', streamer);

    if (token) {
      sessionStorage.setItem('twitch_token', token);

      fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Client-ID': 'wgp4pcigettkv18ljb9nmp3km3tebq' // Your Twitch Client ID
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('User data from Twitch:', data);
        const userInfo = data.data[0];
        sessionStorage.setItem('twitch_user', JSON.stringify(userInfo));

        // Navigate directly to the sign-up form with plan and streamer information
        if (plan) {
          navigate(`/buy?plan=${plan}&streamer=${streamer || ''}`);
        } else {
          navigate('/buy');
        }
      })
      .catch(error => {
        console.error('Error fetching user data from Twitch:', error);
      });

    } else {
      console.error('No token found');
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
};

export default OAuthRedirect;
