import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import "./Stars.scss";

function Stars({ stars }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, index) => {
        const number = index + 0.5;
        return (
          <span key={index}>
            {stars > number ? (
              <BsStarFill />
            ) : stars > index ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default Stars;
