import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <input type="text" data-testid="login-name-input" />
        <button type="submit" onClick={ createUser }>Entrar</button>
      </div>
    );
  }
}
