// src/pages/LinkedAccount.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LinkedAccount: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = sessionStorage.getItem('twitch_token');
      if (token) {
        try {
          const response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Client-ID': 'wgp4pcigettkv18ljb9nmp3km3tebq', // Replace with your actual Client ID
            },
          });
          setUserInfo(response.data.data[0]);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      } else {
        console.error('No token found in session storage');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="LinkedAccount">
      {userInfo ? (
        <div>
          <h1>Welcome, {userInfo.display_name}!</h1>
          <img src={userInfo.profile_image_url} alt="Profile" />
          <p>{userInfo.description}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default LinkedAccount;
