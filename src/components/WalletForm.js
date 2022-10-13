import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesAction, totalValue, totalValueAndExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentId: 0,
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.totalValueFunction = this.totalValueFunction.bind(this);
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const keyName = target.name;
    this.setState({ [keyName]: value });
  };

  totalValueFunction = () => {
    const { expenses, toTotalValue, totalValueProps } = this.props;
    expenses.map((element) => {
      const value = parseInt(element.value, 10);
      const { currency } = element;
      const { exchangeRates } = element;
      const currentCoin = exchangeRates[currency];
      const currentValueCoin = currentCoin.ask * value;
      let newTotalValue = (totalValueProps + currentValueCoin);
      if (newTotalValue === 0) {
        newTotalValue = '0.00';
      }
      toTotalValue(Math.round((newTotalValue + Number.EPSILON) * 100) / 100);
      return '';
    });
    this.setState({ value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação' });
  };

  handleClick = async () => {
    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await api.json();
    // delete (data.USDT)
    const { value, description, currency, method, tag, currentId } = this.state;
    const { toExpenses } = this.props;
    const dispatchInfos = {
      id: currentId,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: data,
    };
    this.setState({ currentId: currentId + 1 });
    await toExpenses(dispatchInfos);
    this.totalValueFunction();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          name="value"
          data-testid="value-input"
          placeholder="Adicione o valor da despesa:"
          value={ value }
          onChange={ this.handleChange }
        />

        <select
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
          name="currency"
        >
          {currencies.map((element, index) => (
            <option
              key={ index }
              value={ element }
            >
              {element}
            </option>))}
        </select>
        <input
          type="textarea"
          data-testid="description-input"
          placeholder="Adicione uma descrição sobre a despesa:"
          value={ description }
          name="description"
          onChange={ this.handleChange }
        />

        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="submit"
          onClick={ () => { this.handleClick(); } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
  totalValueProps: PropTypes.string.isRequired,
  toTotalValue: PropTypes.string.isRequired,
  toExpenses: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  toExpenses: (value) => dispatch(expensesAction(value)),
  toTotalValue: (value) => dispatch(totalValue(value)),
  totalValueAndExpenses: () => dispatch(totalValueAndExpenses()),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  totalValueProps: state.wallet.totalValue,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
