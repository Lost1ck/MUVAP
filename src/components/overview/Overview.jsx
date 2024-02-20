import React from 'react';
import PropTypes from 'prop-types';

const Overview = ({ movie }) => {
  const maxLength = 120;
  if (!movie || !movie.overview) {
    return <div style={{ textAlign: 'left', paddingTop: '10px' }} />;
  }
  if (movie.overview.length > maxLength) {
    const truncatedOverview = `${movie.overview.slice(0, maxLength)}...`;
    return <p className="card__text" style={{ textAlign: 'left', paddingTop: '10px' }}>{truncatedOverview}</p>;
  }
  return <p className="card__text" style={{ textAlign: 'left', paddingTop: '10px' }}>{movie.overview}</p>;
};

Overview.propTypes = {
  movie: PropTypes.shape({
    overview: PropTypes.string.isRequired,
  }).isRequired,
};

export default Overview;
