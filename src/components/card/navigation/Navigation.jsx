/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Navigation.jsx
import React from 'react';
import { Divider, Input, Button } from 'antd';
import {
  Routes, Route, Link, Navigate,
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
  const handleCheckedRatingT = () => {
    setCheckedRating(true);
  };

  const handleCheckedRatingF = () => {
    setCheckedRating(false);
  };
  return (
    <>
      <nav>
        <Link to="/search">
          <Button className="header__btns" onClick={handleCheckedRatingT}>
            Search
          </Button>
        </Link>
        <Link to="/rated">
          <Button className="header__btns" onClick={handleCheckedRatingF}>
            Rated
          </Button>
        </Link>
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
