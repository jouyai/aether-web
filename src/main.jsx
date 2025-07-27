import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Optional: Error boundary simple
const ErrorBoundary = ({ children }) => {
  return (
    <React.Suspense fallback={<div className="flex items-center justify-center h-screen">Loading app...</div>}>
      {children}
    </React.Suspense>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
