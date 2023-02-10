import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';

import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import Catalog from './catalog';
import { AppRoute } from '../../consts';

const mockStore = configureMockStore([thunk]);

const fakePromo = makeFakePromo();
const fakeCameras = makeFakeCameras(20);

describe('Component: Catalog', () => {

  it('1. should render correctly when cameras data loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: { isCamerasDataLoading: true, isPromoDataLoading: false, cameras: [], promo: fakePromo },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Загрузка, пожалуйста подождите/i)).toBeInTheDocument();

  });
  it('2. should render correctly if params is wrong', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: { isCamerasDataLoading: false, isPromoDataLoading: false, cameras: fakeCameras, promo: fakePromo },
    });
    const fakeLink = '/catalog/page_user-put-in-addres-bar';
    history.push(fakeLink);
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
    expect(screen.getByText(/404. Увы страница не найдена!/i)).toBeInTheDocument();
  });
  it('3. should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: { isCamerasDataLoading: false, isPromoDataLoading: false, cameras: fakeCameras, promo: fakePromo },
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
});
