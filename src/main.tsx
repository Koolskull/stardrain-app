import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { PrivyProvider } from '@privy-io/react-auth';
import './index.css';  // Or your CSS file

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email'],  // Add more as needed
        appearance: {
          theme: 'light',  // Customize as needed
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
