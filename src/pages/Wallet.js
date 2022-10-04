import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchAPI } from '../redux/actions';

class Wallet extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <WalletForm currencies={ currencies } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestAPI: dispatch(fetchAPI()),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  currencies: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
