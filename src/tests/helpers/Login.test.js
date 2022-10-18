import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Testa a página inicial (login)', () => {
  test('testa se existe os elementos necessários.', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const entrarBtn = screen.getByText('Entrar');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(entrarBtn).toBeInTheDocument();
  });
  test('testa ao digitar nos inputs e clique no botão aconteçam o esperado.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const entrarBtn = screen.getByText('Entrar');
    userEvent.type(emailInput, 'jvitorrrr@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(entrarBtn);
    await waitFor(() => {
      expect(screen.getByText('TrybeWallet')).toBeInTheDocument();
    });
    expect(history.location.pathname).toBe('/carteira');
    // mentoria
  });
});
