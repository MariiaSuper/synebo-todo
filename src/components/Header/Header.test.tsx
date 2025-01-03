import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders New todo input', () => {
  render(<Header />);
  const headerElement = screen.getByTestId(/new-todo__input/i);
  expect(headerElement).toBeInTheDocument();
});
