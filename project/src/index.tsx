import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { HelmetProvider } from 'react-helmet-async';

import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import { store } from './store';
import { fetchCamerasPriceRangeAction } from './store/api-actions';

store.dispatch(fetchCamerasPriceRangeAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Provider store={store}>
          <ToastContainer />
          <App />
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  </StrictMode>
);
