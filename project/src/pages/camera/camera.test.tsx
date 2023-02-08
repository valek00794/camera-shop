import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';

import { makeFakeCameras, makeFakeReviews, fakeCameraInfo } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../consts';
import Camera from './camera';

const mockStore = configureMockStore([thunk]);

const fakeCameras = makeFakeCameras(20);
const fakeSimilarCameras = makeFakeCameras(20);
const fakeReviews = makeFakeReviews(10);
window.scrollTo = jest.fn();

describe('Component: Camera', () => {

  it('1. should render correctly when cameraInfo data loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        cameras: fakeCameras,
        cameraInfo: fakeCameraInfo,
        isCameraInfoDataLoading: true,
        similarCameras: fakeSimilarCameras,
        reviews: fakeReviews,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Camera />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Загрузка, пожалуйста подождите/i)).toBeInTheDocument();

  });
  it('2. should render correctly if params :id is wrong', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        cameras: fakeCameras,
        cameraInfo: fakeCameraInfo,
        isCameraInfoDataLoading: false,
        similarCameras: fakeSimilarCameras,
        reviews: fakeReviews,
      },
    });
    const fakeLink = '/catalog/user-put-in-addres-bar';
    history.push(fakeLink);
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path={AppRoute.Camera} element={<Camera />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(/404. Увы страница не найдена!/i)).toBeInTheDocument();
  });
  it('3. should render correctly if params :about is wrong', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        cameras: fakeCameras,
        cameraInfo: fakeCameraInfo,
        isCameraInfoDataLoading: false,
        similarCameras: fakeSimilarCameras,
        reviews: fakeReviews,
      },
    });
    const fakeLink = `/catalog/${fakeCameraInfo.id}/user-put-in-addres-bar`;
    history.push(fakeLink);
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path={AppRoute.DefaultCamera} element={<Camera />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(/404. Увы страница не найдена!/i)).toBeInTheDocument();
  });
  it('4. should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        cameras: fakeCameras,
        cameraInfo: fakeCameraInfo,
        isCameraInfoDataLoading: false,
        similarCameras: fakeSimilarCameras,
        reviews: fakeReviews,
      },
    });
    const fakeLink = `/catalog/${fakeCameraInfo.id}/description`;
    history.push(fakeLink);
    render(

      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path={AppRoute.DefaultCamera} element={<Camera />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>

    );
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Показать больше отзывов/i)).toBeInTheDocument();
  });
  it('5. should render correctly if similarCameras is empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        cameras: fakeCameras,
        cameraInfo: fakeCameraInfo,
        isCameraInfoDataLoading: false,
        similarCameras: [],
        reviews: [],
      },
    });
    const fakeLink = `/catalog/${fakeCameraInfo.id}/specifications`;
    history.push(fakeLink);
    render(

      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path={AppRoute.DefaultCamera} element={<Camera />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>

    );
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.queryByText(/Похожие товары/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.queryByText(/Показать больше отзывов/i)).not.toBeInTheDocument();
  });
});
