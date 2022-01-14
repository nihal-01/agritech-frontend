import React from "react";
import { Link } from "react-router-dom";

import "./Pagination.scss";

const productsPerPage = 10;

function Pagination({ totalProducts }) {
  const pageNumbers = [];
  for (var i = 1; i < Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => {
        return (
          <Link to={`?page=${number}&limit=${productsPerPage}`} key={number}>
            {number}
          </Link>
        );
      })}
    </div>
  );
}

export default Pagination;
