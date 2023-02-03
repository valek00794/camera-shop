import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import NotFound from './not-found';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404. Увы страница не найдена!');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
