import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { fakeCameraInfo, makeFakeCameras } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import ProductCard from './product-card';

const mockStore = configureMockStore([thunk]);

const fakeSmilarCameras = makeFakeCameras(4);

const store = mockStore({
  DATA: { similarCameras: fakeSmilarCameras },
});

describe('Component: ProductCard', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${fakeCameraInfo.name}`);
    expect(screen.getByText(`${fakeCameraInfo.category} ${fakeCameraInfo.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCameraInfo.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${fakeCameraInfo.rating}`)).toBeInTheDocument();

  });

  it('2. should click more info correctly', async () => {
    const history = createMemoryHistory();
    const fakeHandleMoreInfo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    screen.getByText('Подробнее').onclick = fakeHandleMoreInfo;
    await userEvent.click(screen.getByText('Подробнее'));
    expect(fakeHandleMoreInfo).toBeCalledTimes(1);
  });

  it('3. should render correctly then click button more info', async () => {
    const history = createMemoryHistory();
    const fakeHandleMoreInfo = jest.fn();
    const fakeLink = `/catalog/${fakeCameraInfo.id}/description`;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo} />
          <Routes>
            <Route
              path={fakeLink}
              element={<h1>This is camera info page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    screen.getByText('Подробнее').onclick = fakeHandleMoreInfo;
    await userEvent.click(screen.getByText('Подробнее'));
    expect(screen.getByText(/This is camera info page/i)).toBeInTheDocument();
  });
  it('4. should click buy correctly', async () => {
    const history = createMemoryHistory();
    const fakeHandleBuy = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCameraInfo} />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Купить')).toBeInTheDocument();
    screen.getByText('Купить').onclick = fakeHandleBuy;
    await userEvent.click(screen.getByText('Купить'));
    expect(fakeHandleBuy).toBeCalledTimes(1);
  });
});
