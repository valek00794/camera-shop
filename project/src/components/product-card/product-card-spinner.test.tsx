import { render, screen } from '@testing-library/react';

import ProductCardSpinner from './product-card-spinner';

describe('Component: ProductCardSpinner', () => {
  it('1. should render correctly', () => {
    render(<ProductCardSpinner />);
    expect(screen.getByText('Loading Loading Loading')).toBeInTheDocument();
  });
});
