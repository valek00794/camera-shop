import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';

import HistoryRouter from '../history-route/history-route';
import App from './app';

import { AppRoute } from '../../consts';
import {
  makeFakePromo,
  makeFakeCameras,
  fakeCameraInfo,
  makeFakeReviews
} from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const fakePromo = makeFakePromo();
const fakeCameras = makeFakeCameras(20);
const fakeSimilarCameras = makeFakeCameras(20);
const fakeReviews = makeFakeReviews(10);

const store = mockStore({
  DATA: {
    isCamerasDataLoading: false,
    isPromoDataLoading: false,
    cameras: fakeCameras,
    promo: fakePromo,
    cameraInfo: fakeCameraInfo,
    similarCameras: fakeSimilarCameras,
    reviews: fakeReviews,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <HelmetProvider>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Provider>
  </HelmetProvider>
);

describe('Application Routing', () => {
  it('1. should render Catalog when user navigate to /', () => {
    history.push(AppRoute.Default);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
  it('2. should render Catalog when user navigate to /catalog/page_1', () => {
    history.push('/catalog/page_1');

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
  it('3. should render Camera when user navigate to /catalog/:id', () => {
    history.push(`/catalog/${fakeCameraInfo.id}`);
    window.scrollTo = jest.fn();

    render(fakeApp);
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();

  });
  it('4. should render NotFound when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404. Увы страница не найдена!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
