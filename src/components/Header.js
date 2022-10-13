import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    let { totalValue } = this.props;
    if (totalValue === 0) {
      totalValue += '.00';
    }
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
  totalValue: PropTypes.number,
};

Header.defaultProps = {
  totalValue: 0,
};

export default connect(mapStateToProps)(Header);
