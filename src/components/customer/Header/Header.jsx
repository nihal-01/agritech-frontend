import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiPhoneCall, BiSearch, BiUser, BiHeart, BiCart } from "react-icons/bi";
import { CgMenuLeft } from "react-icons/cg";

import "./Header.scss";
import { leavesImg } from "../../../assets/images";
import { LoginCard, Navbar, SidebarCart } from "..";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  console.log(searchKeyword);

  return (
    <header className="header__wrapper">
      <div className="header">
        <div className="header__menu">
          <CgMenuLeft />
        </div>
        <div className="header__logo__wrapper">
          <h1 className="header__logo">
            <Link to="/">
              Agritech <img src={leavesImg} alt="" />
            </Link>
          </h1>
          <div className="header__contact">
            <span>
              <BiPhoneCall />
            </span>
            <a href="tel:+918899776655">+91 8899776655</a>
          </div>
        </div>
        <div className="header__search__wrapper">
          <div className="header__search">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button>
              <BiSearch />
            </button>
          </div>
        </div>
        <div className="header__left">
          <div className="header__signin__wrapper">
            <Link
              to="#"
              className="header__signin"
              onClick={() => setIsLoginOpen(!isLoginOpen)}
            >
              <div className="header__signin__icon">
                <BiUser />
              </div>
              <div className="header__signin__content">
                <span>Hello</span>
                <br />
                <span>
                  <strong>Sign In</strong> or <strong>Register</strong>
                </span>
              </div>
            </Link>
            {isLoginOpen && <LoginCard setIsLoginOpen={setIsLoginOpen} />}
          </div>
          <Link to="/wishlist" className="header__wishlist__icon">
            <BiHeart />
            <span>2</span>
          </Link>
          <div className="header__cart__wrapper">
            <div
              className="header__cart__icon"
              onClick={() => {
                setIsLoginOpen(false);
                setIsSidebarOpen(true);
              }}
            >
              <BiCart />
              <span>0</span>
            </div>
            <SidebarCart
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </div>
      </div>
      <hr />
      <Navbar />
      <hr />
    </header>
  );
}

export default Header;
