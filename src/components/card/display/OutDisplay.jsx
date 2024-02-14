/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Cards from '../Cards.jsx';
import Roulling from '../../spin/Spin.jsx';

class DisplayComponent extends Component {
  render() {
    const { searchData } = this.props;
    const {
      isLoading,
      error, movies, checkedRating, handleRatingChange,
      ratedMovies, getRatingForMovie,
    } = searchData;

    if (isLoading) {
      return <Roulling />;
    }
    return (
      <Cards
        error={error}
        movies={movies}
        checkedRating={checkedRating}
        handleRatingChange={handleRatingChange}
        ratedMovies={ratedMovies}
        getRatingForMovie={getRatingForMovie}
      />
    );
  }
}

export default DisplayComponent;
