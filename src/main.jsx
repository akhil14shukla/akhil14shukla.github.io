import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { useStore } from './store';

// apply persisted theme before first paint
document.documentElement.setAttribute('data-theme', useStore.getState().theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
