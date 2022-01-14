import React, { useEffect, useState } from "react";

import "./SidebarCart.scss";
import { products } from "../../../utils/constants";
import { SidebarCartContent, SidebarCartHeader, SidebarCartLoading } from ".";

function SidebarCart({ isSidebarOpen, setIsSidebarOpen }) {
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCartLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="sidebarCart__wrapper">
      <div
        className={
          isSidebarOpen
            ? "sidebarCart__ovarlay sidebarCart__ovarlay__active"
            : "sidebarCart__ovarlay"
        }
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={
          isSidebarOpen ? "sidebarCart sidebarCart__active" : "sidebarCart"
        }
      >
        <SidebarCartHeader setIsSidebarOpen={setIsSidebarOpen} />
        {cartLoading ? (
          <SidebarCartLoading />
        ) : products.length > 0 ? (
          <SidebarCartContent setIsSidebarOpen={setIsSidebarOpen} />
        ) : (
          <p className="sidebarCart__noproducts">No products in the cart.</p>
        )}
      </div>
    </div>
  );
}

export default React.memo(SidebarCart);
