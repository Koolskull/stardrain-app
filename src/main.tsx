import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Or your global styles

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains'; // Add more chains like polygon if needed
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css'; // Import RainbowKit CSS

const config = getDefaultConfig({
  appName: 'Stardrain App', // Your app's name
  projectId: '4008f94745c97e053c6d94de788d0bcc', // Paste your Project ID here
  chains: [mainnet], // Ethereum mainnet; add testnets like sepolia for dev
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
  <RainbowKitProvider>
  <App />
  </RainbowKitProvider>
  </QueryClientProvider>
  </WagmiProvider>
  </React.StrictMode>
);
