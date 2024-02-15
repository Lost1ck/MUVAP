/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination } from 'antd';

const Footer = ({ searchData }) => {
  const { currentPage, totalPages, handlePageChange } = searchData;

  return (
    <Pagination
      defaultCurrent={currentPage}
      total={totalPages}
      onChange={handlePageChange}
    />
  );
};

export default Footer;
