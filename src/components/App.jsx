/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
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
      currentTab: '',
      isLoading: true,
      outOfSearch: false,
      isOnline: navigator.onLine,
      checkedRating: true,
      guestSessionId: null,
    };
    this.debouncedFetchData = debounce(this.fetchData, 500);
  }

  async componentDidMount() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);

    const savedGuestSessionId = localStorage.getItem('guestSessionId');

    if (savedGuestSessionId) {
      this.setState({ guestSessionId: savedGuestSessionId }, this.updateRatedMovies);
    } else {
      try {
        const sessionData = await guestSession();
        if (sessionData && sessionData.guest_session_id) {
          localStorage.setItem('guestSessionId', sessionData.guest_session_id);
          this.setState({ guestSessionId: sessionData.guest_session_id }, this.updateRatedMovies);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }

    const savedRatedMovies = localStorage.getItem('ratedMovies');
    const ratedMovies = savedRatedMovies ? JSON.parse(savedRatedMovies) : [];
    this.setState({ ratedMovies });

    // Загружаем фильмы
    this.fetchData();
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
  }

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

  handleRatingChange = async (movieId, newRating) => {
    const movieToUpdate = this.state.movies.find((movie) => movie.id === movieId);
    if (!movieToUpdate) {
      console.error('Movie not found');
      return;
    }

    const updatedMovie = { ...movieToUpdate, rating: newRating };

    const updatedRatedMovies = [...this.state.ratedMovies
      .filter((movie) => movie.id !== movieId), updatedMovie];
    this.setState({ ratedMovies: updatedRatedMovies });

    localStorage.setItem('ratedMovies', JSON.stringify(updatedRatedMovies));

    try {
      const { guestSessionId } = this.state;
      if (guestSessionId) {
        await rateMovieInGuestSession(movieId, newRating, guestSessionId);
      } else {
        console.error('Guest session ID is not set.');
      }
    } catch (error) {
      console.error('Error while rating movie:', error);
    }
  };

  fetchData = async (page = 1) => {
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

  updateRatedMovies = async () => {
    const { guestSessionId } = this.state;
    if (!guestSessionId) return;

    const ratedMoviesData = await fetchRatedMoviesByGuestSession(guestSessionId);
    if (ratedMoviesData && ratedMoviesData.results) {
      this.setState({ ratedMovies: ratedMoviesData.results }, () => {
        localStorage.setItem('ratedMovies', JSON.stringify(this.state.ratedMovies));
      });
    }
  };

  getRatingForMovie = (movieId) => {
    const { ratedMovies } = this.state;
    const ratedMovie = ratedMovies.find((movie) => movie.id === movieId);
    return ratedMovie ? ratedMovie.rating : 0;
  };

  setCheckedRating = (checked) => {
    this.setState({ checkedRating: checked });
  };

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
