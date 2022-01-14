import React, { useState } from "react";

import "./ProductList.scss";
import { noProductImg } from "../../../assets/images";
import { ListView, GridView, Pagination } from "..";
import { products } from "../../../utils/constants";

// const loading = false;
const gridView = true;

function ProductList() {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (products.length <= 0) {
    return (
      <div className="productNotFound">
        <div className="productNotFound__img__wrapper">
          <img src={noProductImg} alt="" onLoad={() => setImgLoaded(true)} />
          <div className="productNotFound__img__loader__wrapper">
            {!imgLoaded && <div className="loader"></div>}
          </div>
        </div>
        <h3>No Products Found!</h3>
      </div>
    );
  }

  if (gridView) {
    return (
      <>
        <GridView products={products} />
        <Pagination totalProducts={products.length} />
      </>
    );
  }

  return <ListView />;
}

export default ProductList;
