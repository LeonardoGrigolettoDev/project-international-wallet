import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { fetchAPI } from '../redux/actions';

class Wallet extends React.Component {
  render() {
    const { currencies, expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <Header />
        <WalletForm currencies={ currencies } />
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestAPI: dispatch(fetchAPI()),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  api: state.wallet.api,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  currencies: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
