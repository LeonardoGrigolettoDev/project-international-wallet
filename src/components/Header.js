import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          {totalValue}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  totalValue: state.wallet.totalValue,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.string,
};

Header.defaultProps = {
  totalValue: '',
};

export default connect(mapStateToProps)(Header);
