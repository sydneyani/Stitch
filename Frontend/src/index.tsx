import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { BrowserRouter as Router } from 'react-router-dom';
// import './index.css';
import App from './App.tsx';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Initial render
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
