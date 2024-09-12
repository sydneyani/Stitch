import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Pay.css';
import axios from 'axios';

const Pay: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [streamer, setStreamer] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const storedStreamer = sessionStorage.getItem('selectedStreamer');
    if (plan) {
      setSelectedPlan(plan);
    }
    if (storedStreamer) {
      setStreamer(storedStreamer);
    }
  }, [location]);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/create-checkout-session', {
        plan: selectedPlan,
        streamer: streamer,
      });
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  
  return (
    <div className="Pay">
      <nav className="navbar">
        <Link to="/">
          <img src="/images/stitch-logo.png" alt="$titch Logo" className="logo" />
        </Link>
        <p className="navbar-text">EARN money by supporting your favorite STREAMER!</p>
      </nav>
      <div className="pay-content">
        <h1>Complete Your Payment</h1>
        <h2>{selectedPlan} Plan: ${selectedPlan === 'Basic' ? '10' : selectedPlan === 'Premium' ? '20' : '50'}/month</h2>
        {streamer && <h3>Supporting Streamer: {streamer}</h3>}
        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Pay;
