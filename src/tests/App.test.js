import { render, screen } from '@testing-library/react';
import App from '../App';

test('check if the button is in document', () => {
  render(<App />);
  const linkElement = screen.getByText("Fazer login com o Google");
  expect(linkElement).toBeInTheDocument();
});
