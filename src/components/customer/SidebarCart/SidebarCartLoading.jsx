import React from "react";

function SidebarCartLoading() {
  return (
    <div className="sidebarCart__loading">
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <div key={index} className="sidebarCart__loading__item">
            <div className="sidebarCart__loading__item__box"></div>
            <div className="sidebarCart__loading__item__content">
              <div className="sidebarCart__loading__item__content__title"></div>
              <div className="sidebarCart__loading__item__content__price"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarCartLoading;
