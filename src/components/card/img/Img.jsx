/* eslint-disable react/prop-types */
import React from 'react';
import { Empty } from 'antd';

const Image = ({ movies, id }) => {
  const movie = movies.find((moviee) => moviee.id === id);

  if (!movie) {
    return <Empty description="" style={{ backgroundColor: 'gray' }} />;
  }

  const imageSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : null;

  return imageSrc ? (
    <img
      key={movie.id}
      src={imageSrc}
      alt={movie.original_title}
    />
  ) : (
    <Empty description={false} style={{ backgroundColor: 'gray' }} />
  );
};

export default Image;
