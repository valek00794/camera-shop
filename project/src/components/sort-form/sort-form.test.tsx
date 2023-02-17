import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import SortForm from './sort-form';
import { useState } from 'react';
import { SortState } from '../../consts';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: { },
});

describe('Component: SortForm', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useState(SortState.Default));
    const fakeSortState = result.current;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortForm sortByState={fakeSortState} sortAscDescState={fakeSortState}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
