import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      coin: 'USD',
      type: 'Dinheiro',
      to: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const keyName = target.name;
    this.setState({ [keyName]: value });
  };

  render() {
    const { value, description, coin, type, to } = this.state;
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
          value={ coin }
          onChange={ this.handleChange }
          name="coin"
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
          value={ type }
          name="type"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          value={ to }
          name="to"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
};

export default WalletForm;
