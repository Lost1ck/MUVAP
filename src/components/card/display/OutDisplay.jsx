/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../Cards.jsx';
import Roulling from '../../spin/Spin.jsx';

const DisplayComponent = ({ searchData }) => {
  const {
    isLoading,
    error,
    movies,
    checkedRating,
    handleRatingChange,
    ratedMovies,
    getRatingForMovie,
    currentTab,
  } = searchData;

  if (isLoading) {
    return <Roulling />;
  }
  if (currentTab === 'Rated') {
    return <h2>No movies</h2>;
  }

  return (
    <Cards
      currentTab={currentTab}
      error={error}
      movies={movies}
      checkedRating={checkedRating}
      handleRatingChange={handleRatingChange}
      ratedMovies={ratedMovies}
      getRatingForMovie={getRatingForMovie}
    />
  );
};

DisplayComponent.propTypes = {
  searchData: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    movies: PropTypes.array.isRequired,
    checkedRating: PropTypes.bool.isRequired,
    handleRatingChange: PropTypes.func.isRequired,
    ratedMovies: PropTypes.array.isRequired,
    getRatingForMovie: PropTypes.func.isRequired,
  }).isRequired,
};

export default DisplayComponent;
