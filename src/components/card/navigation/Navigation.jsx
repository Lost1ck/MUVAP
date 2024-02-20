/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Input } from 'antd';
import {
  NavLink, useLocation, Navigate, Route, Routes,
} from 'react-router-dom';
import DisplayComponent from '../display/OutDisplay.jsx';
import Footer from '../../footer/Footer.jsx';
import { NotFound } from '../Alert.jsx';

export const SearchPage = ({ searchData }) => {
  const {
    inputValue, handleInputChange, outOfSearch, movies,
  } = searchData;

  return (
    <>
      <Divider />
      <Input
        placeholder="Type to search..."
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {outOfSearch || !movies || movies.length === 0 ? (
        <NotFound inputValue={inputValue} />
      ) : (
        <DisplayComponent searchData={searchData} />
      )}
      <Footer searchData={searchData} />
    </>
  );
};

SearchPage.propTypes = {
  searchData: PropTypes.shape({
    inputValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    ratedMovies: PropTypes.array.isRequired,
    outOfSearch: PropTypes.bool.isRequired,
    movies: PropTypes.array.isRequired,
  }).isRequired,
};

export const RatedPage = ({ searchData }) => (
  <>
    <Divider />
    <DisplayComponent searchData={searchData} />
  </>
);

RatedPage.propTypes = {
  searchData: PropTypes.shape({
    inputValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    ratedMovies: PropTypes.array.isRequired,
    outOfSearch: PropTypes.bool.isRequired,
    movies: PropTypes.array.isRequired,
  }).isRequired,
};

const Navigation = ({ searchData }) => {
  const { setCheckedRating } = searchData;
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const location = useLocation();
  const searchRef = useRef(null);
  const ratedRef = useRef(null);

  const updateIndicator = (node) => {
    if (node) {
      const { offsetLeft, clientWidth } = node;
      setIndicatorStyle({
        width: '75px',
        left: `${offsetLeft + (clientWidth - 75) / 2}px`,
        opacity: 1,
      });
    }
  };

  const handleCheckedRatingT = () => {
    setCheckedRating(true);
  };

  const handleCheckedRatingF = () => {
    setCheckedRating(false);
  };

  useEffect(() => {
    if (location.pathname === '/search' && searchRef.current) {
      updateIndicator(searchRef.current);
      handleCheckedRatingT();
    } else if (location.pathname === '/rated' && ratedRef.current) {
      updateIndicator(ratedRef.current);
      handleCheckedRatingF();
    }
  }, [location]);

  return (
    <>
      <nav>
        <NavLink
          to="/search"
          className="header__btns"
          onClick={handleCheckedRatingT}
          ref={searchRef}
        >
          Search
        </NavLink>
        <NavLink
          to="/rated"
          className="header__btns"
          onClick={handleCheckedRatingF}
          ref={ratedRef}
        >
          Rated
        </NavLink>
        <div className="active-tab-indicator" style={indicatorStyle} />
      </nav>
      <Routes>
        <Route path="/" element={<Navigate replace to="/search" />} />
        <Route path="/search" element={<SearchPage searchData={searchData} />} />
        <Route path="/rated" element={<RatedPage searchData={searchData} />} />
      </Routes>
    </>
  );
};

Navigation.propTypes = {
  searchData: PropTypes.shape({
    setCheckedRating: PropTypes.func.isRequired,
  }).isRequired,
};

export default Navigation;
