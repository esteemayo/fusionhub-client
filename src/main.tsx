import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import App from './App.tsx';

import { store } from './features/store.ts';
import QueryProvider from './providers/QueryProvider.tsx';

import './global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryProvider>
    </HelmetProvider>
  </StrictMode>
);
