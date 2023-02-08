import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';

import HistoryRouter from '../../components/history-route/history-route';
import NotFound from './not-found';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <NotFound />
        </HistoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(/404. Увы страница не найдена!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
