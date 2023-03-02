import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import SortForm from './sort-form';
import userEvent from '@testing-library/user-event';
;

const history = createMemoryHistory();
describe('Component: SortForm', () => {
  it('1. should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <SortForm />
      </HistoryRouter>
    );
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
  it('3. should render correctly if select sort by Popular and should auto cheked order Asc', async () => {

    render(
      <HistoryRouter history={history}>
        <SortForm />
      </HistoryRouter>
    );

    const radioSortByPrice = screen.getByLabelText('По цене');
    const radioOrderAsc = screen.getByLabelText('По возрастанию');
    const radioSortByPopular = screen.getByLabelText('По популярности');
    const radioOrderDesc = screen.getByLabelText('По убыванию');

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();

    await userEvent.click(radioSortByPopular);
    expect(radioSortByPopular).toBeChecked();
    expect(radioOrderAsc).toBeChecked();
    expect(radioSortByPrice).not.toBeChecked();
    expect(radioOrderDesc).not.toBeChecked();
  });
  it('2. should render correctly if select sort by Price and should auto cheked order Asc', async () => {
    render(
      <HistoryRouter history={history}>
        <SortForm />
      </HistoryRouter>
    );

    const radioSortByPrice = screen.getByLabelText('По цене');
    const radioOrderAsc = screen.getByLabelText('По возрастанию');
    const radioSortByPopular = screen.getByLabelText('По популярности');
    const radioOrderDesc = screen.getByLabelText('По убыванию');

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();

    await userEvent.click(radioSortByPrice);
    expect(radioSortByPrice).toBeChecked();
    expect(radioOrderAsc).toBeChecked();
    expect(radioSortByPopular).not.toBeChecked();
    expect(radioOrderDesc).not.toBeChecked();
  });

  it('4. should render correctly if select order Asc and should auto cheked sort by Price', async () => {

    render(
      <HistoryRouter history={history}>
        <SortForm />
      </HistoryRouter>
    );

    const radioSortByPrice = screen.getByLabelText('По цене');
    const radioOrderAsc = screen.getByLabelText('По возрастанию');
    const radioSortByPopular = screen.getByLabelText('По популярности');
    const radioOrderDesc = screen.getByLabelText('По убыванию');

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();

    await userEvent.click(radioOrderAsc);

    expect(radioOrderAsc).toBeChecked();
    expect(radioSortByPrice).toBeChecked();

    expect(radioSortByPopular).not.toBeChecked();
    expect(radioOrderDesc).not.toBeChecked();
  });
  it('5. should render correctly if select order Desc and should auto cheked sort by Price', async () => {
    const historyTest = createMemoryHistory();
    render(
      <HistoryRouter history={historyTest}>
        <SortForm />
      </HistoryRouter>
    );

    const radioSortByPrice = screen.getByLabelText('По цене');
    const radioOrderAsc = screen.getByLabelText('По возрастанию');
    const radioSortByPopular = screen.getByLabelText('По популярности');
    const radioOrderDesc = screen.getByLabelText('По убыванию');

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();

    await userEvent.click(radioOrderDesc);
    expect(radioOrderDesc).toBeChecked();
    expect(radioSortByPrice).toBeChecked();
    expect(radioSortByPopular).not.toBeChecked();
    expect(radioOrderAsc).not.toBeChecked();
  });
  it('6. should render correctly if select order Desc and sort by Price, and order not change after select sort by Rating', async () => {
    const historyTest = createMemoryHistory();
    render(
      <HistoryRouter history={historyTest}>
        <SortForm />
      </HistoryRouter>
    );

    const radioSortByPrice = screen.getByLabelText('По цене');
    const radioOrderAsc = screen.getByLabelText('По возрастанию');
    const radioSortByPopular = screen.getByLabelText('По популярности');
    const radioOrderDesc = screen.getByLabelText('По убыванию');

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();

    await userEvent.click(radioOrderDesc);
    expect(radioOrderDesc).toBeChecked();
    expect(radioSortByPrice).toBeChecked();
    expect(radioSortByPopular).not.toBeChecked();
    expect(radioOrderAsc).not.toBeChecked();
    await userEvent.click(radioSortByPopular);
    expect(radioOrderDesc).toBeChecked();
    expect(radioSortByPopular).toBeChecked();
    expect(radioSortByPrice).not.toBeChecked();
    expect(radioOrderAsc).not.toBeChecked();
  });
});
