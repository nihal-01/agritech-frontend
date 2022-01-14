import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BsMoonFill, BsBellFill, BsSunFill } from "react-icons/bs";

import "./AdminNavbar.scss";
import { avatar } from "../../../assets/images";

function AdminNavbar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="admin__navbar">
      <i className="admin__navbar__menu">
        <FiMenu />
      </i>
      <div className="admin__navbar__right">
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? <BsSunFill /> : <BsMoonFill />}
        </button>
        <button>
          <BsBellFill />
          <span></span>
        </button>
        <div className="admin__navbar__avatar">
          <img src={avatar} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
