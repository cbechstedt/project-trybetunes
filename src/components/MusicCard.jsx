import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    favoriteChecked: false,
    loading: false,
  };

  handleChecked = async ({ target }) => {
    const { musics } = this.props;
    console.log(musics);
    const songChecked = musics.find((music) => music.trackId === Number(target.id));
    console.log(songChecked);
    this.setState({
      loading: true,
    });
    await addSong(songChecked);
    this.setState({
      loading: false,
      favoriteChecked: true,
    });
  };

  render() {
    const { loading, favoriteChecked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <p>{trackName}</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading ? <Loading />
          : (
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor={ trackId }
            >
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                checked={ favoriteChecked }
                onChange={ this.handleChecked }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.instanceOf(Array),
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  key: PropTypes.string,
}.isRequired;
