import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisterError(error) {
    console.error('Service worker registration failed:', error);
  },
});

// Add error boundary for debugging
window.onerror = function(msg, _url, lineNo, columnNo, error) {
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: monospace;">
    <h1>Error:</h1>
    <p>${msg}</p>
    <p>Line: ${lineNo}, Column: ${columnNo}</p>
    <p>${error ? error.stack : ''}</p>
  </div>`;
  return false;
};

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error) {
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: monospace;">
    <h1>React Mount Error:</h1>
    <p>${error.message}</p>
    <pre>${error.stack}</pre>
  </div>`;
}
