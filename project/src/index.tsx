import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import { store } from './store';
import { fetchCamerasAction } from './store/api-actions';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { HelmetProvider } from 'react-helmet-async';

store.dispatch(fetchCamerasAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Provider store={store}>
          <ToastContainer />
          <App />
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  </React.StrictMode>
);
