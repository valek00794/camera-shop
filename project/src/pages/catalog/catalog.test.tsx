import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';

import { makeFakeCameras, makeFakePromo, makeFakePriceRange, fakeCameraInfo } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import Catalog from './catalog';
import { AppRoute } from '../../consts';

const mockStore = configureMockStore([thunk]);

const fakePromo = makeFakePromo();
const fakeCameras = makeFakeCameras(20);
const fakePriceRange = makeFakePriceRange();

describe('Component: Catalog', () => {

  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        isCamerasDataLoading: false,
        isPromoDataLoading: false,
        cameras: fakeCameras,
        promo: fakePromo,
        priceRange: fakePriceRange,
        isPriceRangeDataLoading: false
      },
    });
    history.push('/catalog/page_1');

    render(

      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path={AppRoute.Catalog} element={<Catalog />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
  it('2. should render correctly if priceRange loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        isCamerasDataLoading: false,
        isPromoDataLoading: false,
        cameras: fakeCameras,
        promo: fakePromo,
        priceRange: fakePriceRange,
        isPriceRangeDataLoading: true
      },
    });
    history.push('/catalog/page_1');

    render(

      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path={AppRoute.Catalog} element={<Catalog />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(/Загрузка, пожалуйста подождите/i)).toBeInTheDocument();
  });
  it('3. should render correctly if cameras loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        isCamerasDataLoading: true,
        isPromoDataLoading: false,
        cameras: [fakeCameraInfo],
        promo: fakePromo,
        priceRange: fakePriceRange,
        isPriceRangeDataLoading: false
      },
    });
    history.push('/catalog/page_1');

    render(

      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path={AppRoute.Catalog} element={<Catalog />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading Loading Loading/i)).toBeInTheDocument();
  });
});
