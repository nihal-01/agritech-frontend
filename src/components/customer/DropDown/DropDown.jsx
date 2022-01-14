import React from "react";
import { NavLink } from "react-router-dom";

function DropDown({ links }) {
  return (
    <ul className="dropdown">
      {links.map((link, index) => (
        <li key={index} className="dropdown__item">
          <NavLink to={link.to}>{link.name}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default DropDown;
