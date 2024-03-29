import React from 'react';
import PropTypes from 'prop-types';
import { Card, Space } from 'antd';

const genresData = {
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ],
};

const MovieGenres = ({ movieGen }) => {
  const getGenreNames = () => movieGen.map((id) => {
    const genre = genresData.genres.find((genreу) => genreу.id === id);
    return genre ? { name: genre.name, id: genre.id } : null;
  });
  const genreNames = getGenreNames();

  return (
    <Space style={{ flexWrap: 'wrap', gap: '5px 8px' }} size={[8, 16]} wrap>
      {genreNames.map((genre) => (
        <Card className="card__genre" key={genre.id}>
          {genre.name}
        </Card>
      ))}
    </Space>
  );
};

MovieGenres.propTypes = {
  movieGen: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MovieGenres;
