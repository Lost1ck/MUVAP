/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Flex, Rate, Typography, Row, Col, Card,
} from 'antd';
import Image from './img/Img.jsx';
import Overview from '../overview/Overview.jsx';
import MovieGenres from '../fileGenre/FileGenre.jsx';
// import { NotFound } from './Alert.jsx';

class Cards extends Component {
  render() {
    const {
      movies, getRatingForMovie,
      ratedMovies, checkedRating,
    } = this.props;

    function getRatingClassName(voteAverage) {
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
    const moviesToDisplay = checkedRating
      ? movies
      : ratedMovies;

    if (!checkedRating && ratedMovies.length === 0) {
      return <h2>No movies</h2>; // Выведите сообщение, если нет оцененных фильмов
    }

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
                    <p className={`card__rate ${getRatingClassName(movie.vote_average)}`}>
                      {(movie.vote_average).toFixed(1)}
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
                  onChange={(newRating) => this.props.handleRatingChange(movie, newRating)}
                />
              </Col>
            </Row>
          </Card>
        ))}
      </section>
    );
  }
}

export default Cards;
