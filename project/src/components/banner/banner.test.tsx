import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { makeFakePromo } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import Banner from './banner';

const mockStore = configureMockStore([thunk]);

const fakePromo = makeFakePromo();

const store = mockStore({
  DATA: { promo: fakePromo },
});

describe('Component: Banner', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText(`${fakePromo.name}`)).toBeInTheDocument();
  });

  it('2. should click button more info correctly', async () => {
    const history = createMemoryHistory();
    const fakeHandleMoreInfo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner/>
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
    const fakeLink = `/catalog/${fakePromo.id}/description`;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
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
});
