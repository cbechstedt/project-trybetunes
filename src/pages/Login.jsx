import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputLogin: '',
      loading: false,
      redirecting: false,
    };
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    });
    const { inputLogin } = this.state;
    await createUser({ name: inputLogin });
    this.setState({
      loading: false,
      redirecting: true,
    });
  };

  handleChange = (event) => {
    this.setState({
      inputLogin: event.target.value,
    });
  };

  render() {
    const { inputLogin, loading, redirecting } = this.state;
    const minLoginLength = 3;
    return (
      <div className="Login" data-testid="page-login">
        <input
          className="form__input"
          type="text"
          data-testid="login-name-input"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          onClick={ this.handleClick }
          disabled={ inputLogin.length < minLoginLength }
        >
          Entrar
        </button>
        {loading && <Loading /> }
        {redirecting && <Redirect to="/search" />}
      </div>
    );
  }
}
