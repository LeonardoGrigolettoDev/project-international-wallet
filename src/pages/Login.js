import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmailAction } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '',
      email: '',
      emailValidation: false,
      passwordValidation: false };
  }

  render() {
    const { addToState, history } = this.props;
    const { password, email, passwordValidation, emailValidation } = this.state;
    return (
      <div>
        <h1>
          Login
        </h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Insira seu e-mail"
          value={ email }
          onChange={ (event) => {
            this.setState({ email: event.target.value });
            // const { email } = this.state;
            if (event.target.value.includes('@') && event.target.value.includes('.com')) {
              this.setState({ emailValidation: true });
            } else {
              this.setState({ emailValidation: false });
            }
          } }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Insira sua senha"
          value={ password }
          onChange={ (event) => {
            const NUMBER_PASS = 6;
            this.setState({ password: event.target.value });
            if (event.target.value.length >= NUMBER_PASS) {
              this.setState({ passwordValidation: true });
            } else {
              this.setState({ passwordValidation: false });
            }
          } }
        />
        <button
          type="submit"
          disabled={ !(passwordValidation && emailValidation) }
          onClick={ () => {
            addToState(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  addToState: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addToState: (value) => dispatch(addEmailAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);
