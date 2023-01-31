import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import { store } from './store';
import { fetchCamerasAction, fetchPromoAction } from './store/api-actions';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

store.dispatch(fetchCamerasAction());
store.dispatch(fetchPromoAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </HistoryRouter>
  </React.StrictMode>
);
