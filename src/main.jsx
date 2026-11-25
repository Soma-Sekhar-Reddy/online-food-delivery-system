import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { QuickBiteProvider } from './context/QuickBiteContext.jsx';

// Import CSS Stylesheets
import '../css/global.css';
import '../css/landing.css';
import '../css/customer.css';
import '../css/restaurant.css';
import '../css/delivery.css';
import '../css/admin.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <QuickBiteProvider>
        <App />
      </QuickBiteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
