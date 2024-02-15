/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Navigation.jsx
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
    inputValue, handleInputChange, ratedMovies, outOfSearch, movies,
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

export const RatedPage = ({ searchData }) => (
  <>
    <Divider />
    <DisplayComponent searchData={searchData} />
  </>
);

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

  useEffect(() => {
    if (location.pathname === '/search' && searchRef.current) {
      updateIndicator(searchRef.current);
    } else if (location.pathname === '/rated' && ratedRef.current) {
      updateIndicator(ratedRef.current);
    }
  }, [location]);

  const handleCheckedRatingT = () => {
    setCheckedRating(true);
  };

  const handleCheckedRatingF = () => {
    setCheckedRating(false);
  };
  return (
    <>
      <nav>
        <NavLink
          to="/search"
          className="header__btns"
          onClick={handleCheckedRatingT}
          innerRef={searchRef}
        >
          Search
        </NavLink>
        <NavLink
          to="/rated"
          className="header__btns"
          onClick={handleCheckedRatingF}
          innerRef={ratedRef}
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

export default Navigation;
