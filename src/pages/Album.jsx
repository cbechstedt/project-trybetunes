import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    album: [],
    musics: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    console.log(data);
    const albumData = data[0];
    console.log(albumData);
    const musicsArray = data.filter((song) => song.trackName);
    console.log(musicsArray);
    this.setState({
      album: albumData,
      musics: musicsArray,
    });
  }

  render() {
    const { album, musics } = this.state;

    return (
      <div data-testid="page-album">
        <header>
          <Header />
        </header>
        <div>
          <h2 data-testid="artist-name">{ album.artistName }</h2>
          <h3 data-testid="album-name">{album.collectionName}</h3>

          {musics.map((music) => (

            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              musics={ musics }

            />

          ))}

        </div>

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
