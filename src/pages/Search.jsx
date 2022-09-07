import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      savedArtist: '',
      inputSearch: '',
      loading: false,
      apiResponse: false,
      albumsList: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      inputSearch: event.target.value,
    });
  };

  handleClick = async () => {
    const { inputSearch } = this.state;
    this.setState({ loading: true });
    const data = await searchAlbumsAPI(inputSearch);
    // console.log(data);
    this.setState({
      savedArtist: inputSearch,
      inputSearch: '',
      loading: false,
      apiResponse: true,
      albumsList: data,
    });
  };

  render() {
    const { inputSearch, loading, apiResponse, savedArtist, albumsList } = this.state;
    const minSearchLength = 2;
    return (
      <div data-testid="page-search">
        <Header />

        {loading ? <Loading /> : (
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Nome do Artista"
              onChange={ this.handleChange }
              value={ inputSearch }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              onClick={ this.handleClick }
              disabled={ inputSearch.length < minSearchLength }
            >
              Pesquisar

            </button>
          </form>
        )}
        { apiResponse && <p>{`Resultado de álbuns de: ${savedArtist}`}</p> }
        {albumsList.length > 1 && apiResponse === true ? (
          albumsList.map((album) => (
            <section key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt="album" />
              <p>{ album.collectionName }</p>
              <p>{ album.artistName }</p>
            </section>
          ))
        ) : <p>Nenhum álbum foi encontrado</p> }

      </div>
    );
  }
}
