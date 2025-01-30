import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import { store } from './features/store.ts';
import QueryProvider from './providers/QueryProvider.tsx';

import './global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryProvider>
  </StrictMode>
);
