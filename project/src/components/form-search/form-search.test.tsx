import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import FormSearch from './form-search';
import { makeFakeCameras } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();

const fakeCameras = makeFakeCameras(5);

describe('Component: FormSearch', () => {
  it('1. should render correctly', () => {
    const store = mockStore({
      DATA: {
        foundCameras: [],
        isSearchDataLoading: false,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
  it('2. should render correctly search response', () => {
    const store = mockStore({
      DATA: {
        foundCameras: fakeCameras,
        isSearchDataLoading: false,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>

    );
    fakeCameras.map((camera) => expect(screen.getByText(`${camera.category} ${camera.name}`)).toBeInTheDocument());
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
  it('3. should type to input field correctly', async () => {
    const store = mockStore({
      DATA: {
        foundCameras: [],
        isSearchDataLoading: false,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>

    );
    await userEvent.type(screen.getByPlaceholderText('Поиск по сайту'), 'Sony imx766');
    expect(screen.getByPlaceholderText('Поиск по сайту')).toHaveDisplayValue('Sony imx766');
  });
  it('4. should click reset correctly', async () => {
    const store = mockStore({
      DATA: {
        foundCameras: [],
        isSearchDataLoading: false,
      },
    });
    const fakeHandleReset = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByLabelText('Сброс')).toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText('Поиск по сайту'), 'Sony imx766');
    expect(screen.getByPlaceholderText('Поиск по сайту')).toHaveDisplayValue('Sony imx766');
    await userEvent.click(screen.getByLabelText('Сброс'));
    expect(screen.getByPlaceholderText('Поиск по сайту')).toHaveDisplayValue('');
  });
});
