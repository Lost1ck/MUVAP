/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
// import PropTypes from 'prop-types'; // Импорт модуля PropTypes
import {
  Flex, Rate, Typography, Row, Col, Card,
} from 'antd';
import Image from './img/Img.jsx';
import Overview from '../overview/Overview.jsx';
import MovieGenres from '../fileGenre/FileGenre.jsx';

class Cards extends Component {
  render() {
    const {
      movies, getRatingForMovie,
      ratedMovies, checkedRating,
    } = this.props;

    function getRatingClassName(voteAverage) {
      if (voteAverage === undefined) {
        return 'default'; // Класс для случаев, когда рейтинг не определен
      }

      const rating = voteAverage.toFixed(1);
      if (rating <= 3) {
        return 'red';
      } if (rating > 3 && rating <= 5) {
        return 'orange';
      } if (rating > 5 && rating <= 7) {
        return 'yellow';
      }
      return 'green';
    }

    function formatDate(releaseDate) {
      if (!releaseDate) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(releaseDate).toLocaleDateString('en-US', options);
    }

    if (!checkedRating && ratedMovies.length === 0) {
      return <h2>No movies</h2>;
    }

    const moviesToDisplay = checkedRating
      ? movies
      : ratedMovies;

    return (
      <section className="flex stable-font">
        {moviesToDisplay.map((movie) => (
          <Card
            className="card"
            key={movie.id}
          >
            <Row
              gutter={24}
              className="card__row"
            >
              <Col span={12}>
                <Image
                  justify-content="space-between"
                  movies={movies}
                  id={movie.id}
                  className="card__image"
                />
              </Col>
              <Col
                span={12}
                className="card__box"
              >
                <Flex>
                  <Typography
                    className="box_header"
                  >
                    {movie.original_title}
                  </Typography>
                  <div>
                    <p className={`card__rate ${getRatingClassName(movie.vote_average || 0)}`}>
                      {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </p>
                  </div>
                </Flex>
                <div className="card__release-date">
                  <p className="card__color-text">{formatDate(movie.release_date)}</p>
                </div>
                <div className="card__movie-gerne">
                  <MovieGenres movieGen={movie.genre_ids} />
                </div>
                <Overview movie={movie} />
                <Rate
                  className="card__stars"
                  allowHalf
                  defaultValue={getRatingForMovie(movie.id)}
                  count={10}
                  onChange={(newRating) => this.props
                    .handleRatingChange(movie.id, newRating)}
                />
              </Col>
            </Row>
          </Card>
        ))}
      </section>
    );
  }
}

// Cards.propTypes = {
//   movies: PropTypes.array.isRequired,
//   getRatingForMovie: PropTypes.func.isRequired,
//   ratedMovies: PropTypes.array.isRequired,
//   checkedRating: PropTypes.bool.isRequired,
//   handleRatingChange: PropTypes.func.isRequired,
// };

export default Cards;
