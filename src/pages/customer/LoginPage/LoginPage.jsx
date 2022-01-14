import React, { useEffect, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./LoginPage.scss";
import { BlankSpace, PageHero } from "../../../components/customer";
import { Link } from "react-router-dom";
import { useForm } from "../../../utils";

function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [user, handleChange] = useForm({ email: "", password: "" });

  const passRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  useEffect(() => {
    if (isShowPassword) {
      passRef.current.type = "text";
    } else {
      passRef.current.type = "password";
    }
  }, [isShowPassword]);

  return (
    <>
      <PageHero title="Sign In" />
      <BlankSpace />
      <div className="loginPage__wrapper">
        <div className="loginPage">
          {/* <h3 className="loginPage__title">Sign In</h3> */}
          <form className="loginPage__form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <div className="loginPage__form__password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                ref={passRef}
                required
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <div className="loginPage__form__saveBox__wrapper">
              <div className="loginPage__form__saveBox">
                <input type="checkbox" name="" id="checkbox" defaultChecked />
                <label htmlFor="checkbox">Remember me</label>
              </div>
              <Link to="/my-account/lost-password">Lost your password?</Link>
            </div>
            <button type="submit" className="loginPage__form__btn">
              LOGIN
            </button>
          </form>
          {/* <p className="loginPage__error">Something went wrong try again</p> */}
          <Link to="/signup" className="loginPage__signup__btn">
            Create an Account
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
