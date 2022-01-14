import React from "react";

function SidebarCartHeader({ setIsSidebarOpen }) {
  return (
    <div className="sidebarCart__header">
      <h4 className="sidebarCart__header__title">Shopping Cart</h4>
      <button
        className="sidebarCart__header__close__btn"
        onClick={() => setIsSidebarOpen(false)}
      >
        CLOSE X
      </button>
    </div>
  );
}

export default SidebarCartHeader;
