import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main page', () => {
  render(<App />);
  const titleElement = screen.getByText(/This is main page/i);
  expect(titleElement).toBeInTheDocument();
});
