import React from "react";
import { Link } from "react-router-dom";

import "./PageHero.scss";

function PageHero({ title, product }) {
  return (
    <div className="page__hero">
      <h3>{title?.slice(0, 25)}</h3>
      <p>
        <Link to="/">Home</Link>
        {product && (
          <>
            {" "}
            &gt; <Link to="/products"> Products </Link>
          </>
        )}{" "}
        &gt; {title}
      </p>
    </div>
  );
}

export default PageHero;
