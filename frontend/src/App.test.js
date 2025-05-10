import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Potato Disease Classifier heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Potato Disease Classifier/i);
  expect(linkElement).toBeInTheDocument();
});
