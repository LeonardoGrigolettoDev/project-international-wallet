import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Login { ...props } /> }
          />
          <Route
            exact
            path="/carteira"
            render={ (props) => <Wallet { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
