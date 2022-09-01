import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({
      user: name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{`Bem vindo, ${user}`}</span>
        {loading && <Loading />}
      </header>

    );
  }
}
