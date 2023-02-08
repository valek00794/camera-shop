import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { makeFakeCameras, fakeCameraInfo } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import BreadcrumbsList from './breadcrumbs-list';
import { AppRoute } from '../../consts';


const mockStore = configureMockStore([thunk]);

const fakeCameras = makeFakeCameras(20);

const store = mockStore({
  DATA: { cameras: fakeCameras, cameraInfo: fakeCameraInfo,},
});

describe('Component: BreadcrumbsList', () => {
  it('1. should render correctly on Catalog page', () => {
    const history = createMemoryHistory();

    const fakeLink = '/catalog/page_1';
    history.push(fakeLink);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Catalog} element={<BreadcrumbsList />} />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Страница 1/i)).toBeInTheDocument();
  });

  it('2. should render correctly on CameraInfo page - description', () => {
    const history = createMemoryHistory();

    const fakeLink = `/catalog/${fakeCameraInfo.id}/description`;
    history.push(fakeLink);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.DefaultCamera} element={<BreadcrumbsList />} />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCameraInfo.category} ${fakeCameraInfo.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });
  it('3. should render correctly  on CameraInfo page - specifications', () => {
    const history = createMemoryHistory();

    const fakeLink = `/catalog/${fakeCameraInfo.id}/specifications`;
    history.push(fakeLink);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.DefaultCamera} element={<BreadcrumbsList />} />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCameraInfo.category} ${fakeCameraInfo.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
  });

});
