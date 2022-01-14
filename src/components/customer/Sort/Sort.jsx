import React from "react";
import { HiOutlineFilter, HiOutlineViewGrid } from "react-icons/hi";
// HiViewGrid
import { BsListUl } from "react-icons/bs";

import "./Sort.scss";

function Sort() {
  return (
    <div className="sort__wrapper">
      <div className="sort">
        <div className="sort__left">
          <button className="sort__left__filter">
            <HiOutlineFilter /> Filter
          </button>
          <p>Showing all 10 results</p>
        </div>
        <div className="sort__right">
          <button className="sort__right__icon">
            <HiOutlineViewGrid />
          </button>
          <button className="sort__right__icon">
            <BsListUl />
          </button>
          <select name="" id="">
            <option value="">Sort by default</option>
            <option value="">Sort by popularity</option>
            <option value="">Sort by name</option>
            <option value="">Sort by price</option>
          </select>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Sort;
