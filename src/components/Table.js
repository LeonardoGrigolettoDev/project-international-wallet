import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseAction, totalValue as allTotalValue } from '../redux/actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  coin = (element) => {
    switch (element.currency) {
    case 'USD':
      return 'Dólar Americano/Real Brasileiro';
    case 'EUR':
      return 'Euro/Real Brasileiro';
    default:
      return `${element.currency}/Real Brasileiro`;
    }
  };

  handleClick = (event) => {
    const { target } = event;
    const { expenses, deleteExpense, totalValue, toTotalValue } = this.props;
    const newExpenses = expenses;
    const valueWithAskElement = document.getElementById(`value${target.name}`);
    newExpenses.splice(target.name, 1);
    const valueWithAsk = valueWithAskElement.innerHTML;
    const newTotalValue = totalValue - valueWithAsk;
    const newTotalValueDec = Math.round((newTotalValue + Number.EPSILON) * 100) / 100;
    toTotalValue(newTotalValueDec);
    deleteExpense(newExpenses); // mentoria?
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          {expenses.map((element) => (
            <tbody key={ `tbody${element.id}` } id={ element.id }>
              <tr>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{`${element.value}.00`}</td>
                <td>{this.coin(element)}</td>
                <td>
                  {Math.round(((element.exchangeRates[element.currency].ask * 1)
                + Number.EPSILON) * 100) / 100}
                </td>
                <td id={ `value${element.id}` }>
                  {Math.round(((element.value
                  * element.exchangeRates[element.currency].ask)
                + Number.EPSILON) * 100) / 100}
                </td>
                <td>Real</td>
                <td>
                  <button
                    name={ element.id }
                    data-testid="delete-btn"
                    onClick={ this.handleClick }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
  deleteExpense: PropTypes.string.isRequired,
  totalValue: PropTypes.string.isRequired,
  toTotalValue: PropTypes.string.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch(deleteExpenseAction(value)),
  toTotalValue: (value) => dispatch(allTotalValue(value)),
});
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  totalValue: state.wallet.totalValue,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
