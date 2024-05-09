import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { hotjar } from 'react-hotjar';
import { BrowserRouter } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import { HJID, HJSV } from '@constants/common.constant';

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
    if (import.meta.env.VITE_NODE_ENV === 'production') {
      ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);

      hotjar.initialize({ id: HJID, sv: HJSV });
    }

    if (import.meta.env.VITE_NODE_ENV !== 'development') {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DNS,
        environment: import.meta.env.VITE_NODE_ENV,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration(),
        ],

        // Performance Monitoring
        tracesSampleRate: 1.0,
        tracePropagationTargets: ['localhost', /^https:\/\/api.snackga.me/],

        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
    }
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
