import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

test('a tela inicial de login', () => {
  renderWithRouterAndRedux(<App />);

  const buttonLogin = screen.getByRole(
    'button',
    { name: 'Entrar' },
  );
  expect(buttonLogin).toBeInTheDocument();

  const placeholderSenha = screen.getByPlaceholderText('Senha');
  expect(placeholderSenha).toBeInTheDocument();
  expect(btnSubmit).toHaveAttribute('disabled');
});
