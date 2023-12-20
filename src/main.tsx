import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      useErrorBoundary: true,
    },
  },
});

const Root = () => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <App />
            </RecoilRoot>
          </QueryClientProvider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);
