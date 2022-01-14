import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import { products } from "../../../utils/constants";

function SidebarCartContent({ setIsSidebarOpen }) {
  return (
    <>
      <div className="sidebarCart__products">
        <ul className="sidebarCart__products__list">
          {products.map((item, index) => {
            return (
              <li key={index} className="sidebarCart__products__item">
                <Link
                  to={`/products/${item.id}`}
                  className="sidebarCart__products__item__img"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <img src={item.image} alt="" />
                </Link>
                <div className="sidebarCart__products__item__content">
                  <Link
                    to={`/products/${item.id}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <p>
                    {2} x <span>${item.price}</span>
                  </p>
                </div>
                <button className="sidebarCart__products__item__remove">
                  <AiOutlineClose />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebarCart__bottom">
        <div className="sidebarCart__bottom__total">
          <span className="sidebarCart__bottom__total__label">Subtotal:</span>
          <span className="sidebarCart__bottom__total__price">$3,096.45</span>
        </div>
        <Link to="/cart" onClick={() => setIsSidebarOpen(false)}>
          <button className="sidebarCart__bottom__btn cart-btn">
            VIEW CART
          </button>
        </Link>
        <Link to="/checkout" onClick={() => setIsSidebarOpen(false)}>
          <button className="sidebarCart__bottom__btn checkout-btn">
            CHECKOUT
          </button>
        </Link>
      </div>
    </>
  );
}

export default SidebarCartContent;
