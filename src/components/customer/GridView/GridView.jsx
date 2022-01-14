import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineEye,
} from "react-icons/ai";
// AiFillHeart
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

import "./GridView.scss";
import { Stars } from "..";

function GridView({ products, count = 4 }) {
  return (
    <div
      className="gridView"
      style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
    >
      {products.map((product) => {
        const { id, name, stars, image, price } = product;
        return (
          <div key={id} className="gridView__item">
            <div className="gridView__item__image__wrapper">
              <Link to={`/products/${id}`}>
                <img src={image} alt="" />
              </Link>
              <div className="gridView__item__buttons">
                <button>
                  <AiOutlineHeart />
                </button>
                <button>
                  <AiOutlineShoppingCart />
                </button>
                <button>
                  <AiOutlineEye />
                </button>
              </div>
            </div>
            <div className="gridView__item__stars">
              <Stars stars={stars} />
            </div>
            <h3 className="gridView__item__name">
              <Link to={`/products/${id}`}>{name}</Link>
            </h3>
            <p className="gridView__item__price">${price}</p>
            <hr className="gridView__item__line" />
            <button className="gridView__item__addToCart">
              ADD TO CART{" "}
              <span>
                <HiOutlineChevronDoubleRight />
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default GridView;
