/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchMovies, { guestSession, fetchRatedMoviesByGuestSession, rateMovieInGuestSession } from './data/Data.jsx';
import { NoInternetConnection } from './card/Alert.jsx';
import Main from './main/Main.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 0,
      inputValue: 'return',
      movies: [],
      ratedMovies: [],
      error: null,
      currentTab: 'Rated',
      isLoading: true,
      outOfSearch: false,
      isOnline: navigator.onLine,
      checkedRating: true,
      guestSessionId: null,
    };
    this.debouncedFetchData = debounce(this.fetchData, 500);
  }

  async componentDidMount() {
    const savedRatedMovies = localStorage.getItem('ratedMovies');
    const ratedMovies = savedRatedMovies ? JSON.parse(savedRatedMovies) : [];
    this.setState({ ratedMovies });
    this.fetchData();
    try {
      const sessionData = await guestSession();
      if (sessionData && sessionData.guest_session_id) {
        this.setState({ guestSessionId: sessionData.guest_session_id }, async () => {
          const ratedMoviesData = await fetchRatedMoviesByGuestSession(this.state.guestSessionId);
          if (ratedMoviesData && ratedMoviesData.results) {
            this.setState({ ratedMovies: ratedMoviesData.results });
          }
        });
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
  }

  fetchData = (page = 1) => {
    if (page === undefined || page === null) {
      return;
    }
    this.setState({ isLoading: true, outOfSearch: false });
    fetchMovies({ inputValue: this.state.inputValue, page })
      .then((data) => {
        this.setState({
          movies: data.movies,
          currentPage: page,
          totalPages: data.totalPages,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          isLoading: false,
          outOfSearch: true,
        });
      });
  };

  handleInputChange = (inputValue) => {
    this.setState({ inputValue }, () => {
      this.debouncedFetchData();
    });
  };

  handlePageChange = (page) => {
    this.fetchData(page);
  };

  handleNetworkChange = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  setCheckedRating = (checked) => {
    this.setState({ checkedRating: checked });
  };

  handleRatingChange = async (movie, newRating) => {
    try {
      const { guestSessionId } = this.state;
      if (guestSessionId) {
        await rateMovieInGuestSession(movie.id, newRating, guestSessionId);
        // После успешного обновления рейтинга, обновляем список оцененных фильмов
        const ratedMoviesData = await fetchRatedMoviesByGuestSession(guestSessionId);
        if (ratedMoviesData) {
          this.setState({ ratedMovies: ratedMoviesData });
        }
        console.log(ratedMoviesData);
      } else {
        console.error('Guest session ID is not set.');
      }
    } catch (error) {
      console.error('Ошибка при отправке рейтинга:', error);
    }
    localStorage.setItem('ratedMovies', JSON.stringify(this.state.ratedMovies));
  };

  getRatingForMovie = (movieId) => {
    const { ratedMovies } = this.state;
    const ratedMovie = ratedMovies.find((movie) => movie.id === movieId);
    return ratedMovie ? ratedMovie.rating : 0;
  };

  async createGuestSession() {
    const guestSessionResponse = await guestSession();
    if (guestSessionResponse.success) {
      this.setState({ guestSessionId: guestSessionResponse });
    } else {
      console.error('Ошибка получения guest_session_id');
    }
  }

  render() {
    const {
      inputValue, movies, error, isLoading, outOfSearch, currentTab,
      isOnline, totalPages, currentPage, checkedRating, ratedMovies,
    } = this.state;

    const searchData = {
      currentTab,
      getRatingForMovie: this.getRatingForMovie,
      handleRatingChange: this.handleRatingChange,
      ratedMovies,
      checkedRating,
      setCheckedRating: this.setCheckedRating,
      inputValue,
      movies,
      error,
      isLoading,
      outOfSearch,
      totalPages,
      currentPage,
      handleInputChange: this.handleInputChange,
      handlePageChange: this.handlePageChange,
    };

    return (
      <section className="app-container">
        {isOnline ? (
          <Router>
            <Main searchData={searchData} />
          </Router>
        ) : (
          <NoInternetConnection isOnline={isOnline} />
        )}
      </section>
    );
  }
}

App.defaultProps = {
  inputValue: 'return',
  movies: [],
  error: null,
  isLoading: true,
  outOfSearch: false,
  isOnline: navigator.onLine,
  totalPages: 0,
  currentPage: 1,
};

export default App;
