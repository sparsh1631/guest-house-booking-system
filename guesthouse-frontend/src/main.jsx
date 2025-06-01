import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// ✅ Bootstrap CSS (for styling)
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Optional: Custom global styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
