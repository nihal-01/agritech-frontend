import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Filters.scss";

const categories = [
  {
    name: "All",
    count: 40,
  },
  {
    name: "Vegitables",
    count: 20,
  },
  {
    name: "Fruits",
    count: 10,
  },
  {
    name: "Diary Products",
    count: 8,
  },
  {
    name: "Seeds",
    count: 2,
  },
];

const tags = [
  "vegitables",
  "healthy",
  "vitamin",
  "natural",
  "meat",
  "organic",
  "juices",
  "home maid",
];

const maxPrice = 1000;

function Filters() {
  const [price, setPrice] = useState(maxPrice);

  return (
    <div className="filters">
      <div className="filters__categories">
        <h3>Explore</h3>
        <hr />
        <ul className="filters__categories__list">
          {categories.map((category, index) => {
            return (
              <li key={index}>
                <Link to={`?category=${category.name}`}>{category.name}</Link> (
                {category.count})
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filters__price">
        <h3>Price</h3>
        <hr />
        <input
          type="range"
          className="filters__price__slider"
          min={0}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="filters__price__range">
          <p>price: $0 - ${price}</p>
          <button>Filter</button>
        </div>
      </div>
      <div className="filters__tags">
        <h3>Product tags</h3>
        <hr />
        <div className="filters__tags__list">
          {tags.map((tag, index) => {
            return (
              <Link to="/" id={index}>
                {tag}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
