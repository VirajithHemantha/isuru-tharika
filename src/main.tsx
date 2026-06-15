import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Admin from './Admin';
import './index.css';

const path = window.location.pathname;

if (path === '/admin' || path === '/admin/') {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Admin />
    </StrictMode>,
  );
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
