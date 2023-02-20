import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import SortForm from './sort-form';
import { SortState } from '../../consts';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: {},
});

describe('Component: SortForm', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortForm />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
