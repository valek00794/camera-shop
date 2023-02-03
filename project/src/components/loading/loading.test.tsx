import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import Loading from './loading';

describe('Component: LoadingScreen', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <Loading />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Загрузка, пожалуйста подождите/i)).toBeInTheDocument();
  });
});
