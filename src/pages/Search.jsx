import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      inputSearch: event.target.value,
    });
  };

  render() {
    const { inputSearch } = this.state;
    const minSearchLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Nome do Artista"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          // onClick={ this.handleClick }
          disabled={ inputSearch.length < minSearchLength }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}
