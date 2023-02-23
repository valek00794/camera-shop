import { render, renderHook, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import FilterForm from './filter-form';
import { useRef } from 'react';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  DATA: {},
});

describe('Component: FilterForm', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useRef(false));
    const fakeRef = result.current;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm
            priceFromFieldFocusRef={fakeRef}
            priceToFieldFocusRef={fakeRef}
            serverPriceFrom={''}
            serverPriceTo={''}
          />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
});
