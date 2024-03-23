import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
    mutations: {
      retry: false,
      throwOnError: true,
    },
  },
});

const Root = () => {
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
  }, []);

  ReactGA.send({
    hitType: 'pageview',
    page: location.pathname,
  });

  return (
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);
