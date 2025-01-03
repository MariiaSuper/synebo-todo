import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('TODO title should exists', () => {
  render(<App />);
  const todoElement = screen.getByText(/TODO/i);
  expect(todoElement).toBeInTheDocument();
});
