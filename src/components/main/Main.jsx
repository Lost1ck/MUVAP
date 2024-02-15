/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/Header.jsx';

const Main = ({ searchData }) => (
  <Header searchData={searchData} />
);

Main.propTypes = {
  searchData: PropTypes.shape({
    currentTab: PropTypes.string.isRequired,
    getRatingForMovie: PropTypes.func.isRequired,
    handleRatingChange: PropTypes.func.isRequired,
    ratedMovies: PropTypes.array.isRequired,
    checkedRating: PropTypes.bool.isRequired,
    setCheckedRating: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    outOfSearch: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
