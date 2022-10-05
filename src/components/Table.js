import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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

  render() {
    const { expenses } = this.props;
    console.log(expenses);
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

          {expenses.map((element, index) => (
            <tbody key={ `tbody${index}` }>
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
                <td>
                  {Math.round(((element.value
                  * element.exchangeRates[element.currency].ask)
                + Number.EPSILON) * 100) / 100}
                </td>
                <td>Real</td>
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
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
