import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const INPUT_EMAIL = 'email-input';
const INPUT_DESCRIPTION = 'description-input';
const INPUT_PASSWORD = 'password-input';
const EMAIL = 'jvitorrrr@gmail.com';
const VALUE = 'value-input';
const INPUT_CURRENCY = 'currency-input';
const ADD_STRING = 'Adicionar despesa';

describe('Testa a página carteira', () => {
  test('testa se existe os elementos necessários.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);
    const entrarBtn = screen.getByText('Entrar');
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(entrarBtn); // AGORA NO WALLET
    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText('TrybeWallet')).toBeInTheDocument();
    const valueInput = screen.getByTestId(VALUE);
    const currencyInput = screen.getByTestId(INPUT_CURRENCY);
    const descriptionInput = screen.getByTestId(INPUT_DESCRIPTION);
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const btnAdd = screen.getByText(ADD_STRING);
    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
  });
  test('testa a funcionalidade dos componentes', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);
    const entrarBtn = screen.getByText('Entrar');
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(entrarBtn); // AGORA NO WALLET
    const valueInput = screen.getByTestId(VALUE);
    const descriptionInput = screen.getByTestId(INPUT_DESCRIPTION);
    const currencyInput = screen.getByTestId(INPUT_CURRENCY);
    const btnAdd = screen.getByText(ADD_STRING);
    const selectEu = await screen.findByText('EUR');
    const selectUs = await screen.findByText('USD');
    expect(selectEu).toBeInTheDocument();
    expect(selectUs).toBeInTheDocument();
    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'comi ali');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.click(btnAdd);
    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'comi ali');
    userEvent.click(btnAdd);
    const p = await screen.findByText('Euro/Real Brasileiro');
    expect(p).toBeInTheDocument();
    const btnDelete = await screen.findByText('Excluir');
    userEvent.click(btnDelete);
    // expect(btnDelete).toBeInTheDocument();
  });
  test('testa a funcionalidade dos inputs', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);
    const entrarBtn = screen.getByText('Entrar');
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(entrarBtn); // AGORA NO WALLET
    const valueInput = screen.getByTestId(VALUE);
    const descriptionInput = screen.getByTestId(INPUT_DESCRIPTION);
    const btnAdd = screen.getByText(ADD_STRING);
    const currencyInput = await screen.findByTestId(INPUT_CURRENCY);
    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'aaa');
    userEvent.click(btnAdd);
    const btnDelete = await screen.findByText('Excluir');
    const LTC = await screen.findByText('LTC');
    console.log(LTC);
    userEvent.click(btnDelete);
    const total = await screen.findByText('0.00');
    expect(total).toBeInTheDocument();
    userEvent.selectOptions(currencyInput, 'LTC');
    userEvent.click(btnAdd);
    const coin = await screen.findByText('LTC/Real Brasileiro');
    expect(coin).toBeInTheDocument();
  });
});
