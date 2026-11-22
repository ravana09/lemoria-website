import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';
import './polish.css';
import './site.css';
import './home.css';
import './pages.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Pages are pre-rendered at build time (scripts/prerender.mjs). If this HTML was rendered for the current
// page, attach to it; otherwise (e.g. /book, or a URL with ?query) render fresh.
if (container.dataset.route === window.location.pathname && !window.location.search) hydrateRoot(container, app);
else createRoot(container).render(app);
