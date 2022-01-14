import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./SignupPage.scss";
import { BlankSpace, PageHero } from "../../../components/customer";
import { useForm } from "../../../utils";

function SignupPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCPassword, setIsShowCPassword] = useState(false);
  const [isPassError, setIsPassError] = useState({ error: false, msg: "" });
  const [isCPassError, setIsCPassError] = useState({ error: false, msg: "" });
  const [user, handleChange] = useForm({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const passRef = useRef(null);
  const cPassRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  // password validation
  useEffect(() => {
    const passwordRegx = /(?=.*\d)(?=.*[a-z]).{5,}/;
    if (!passwordRegx.test(user.password) && user.password) {
      setIsPassError({
        error: true,
        msg: "Must contain at least one number and one lowercase letter, and at least 5 or more characters",
      });
    } else {
      setIsPassError({ error: false, msg: "" });
    }
  }, [user.password]);

  // confirm password validation
  useEffect(() => {
    if (user.password !== user.cPassword && user.cPassword) {
      setIsCPassError({ error: true, msg: "Password is not same." });
    } else {
      setIsCPassError({ error: false, msg: "" });
    }
  }, [user.cPassword, user.password]);

  // password show hide functionality
  useEffect(() => {
    if (isShowPassword) {
      passRef.current.type = "text";
    } else {
      passRef.current.type = "password";
    }
  }, [isShowPassword]);

  // confirm password show hide functionality
  useEffect(() => {
    if (isShowCPassword) {
      cPassRef.current.type = "text";
    } else {
      cPassRef.current.type = "password";
    }
  }, [isShowCPassword]);

  return (
    <>
      <PageHero title="Sign Up" />
      <BlankSpace />
      <div className="signupPage__wrapper">
        <div className="signupPage">
          {/* <h3 className="signupPage__title">Sign Up</h3> */}
          <form className="signupPage__form" onSubmit={handleSubmit}>
            <div className="signupPage__form__name">
              <div className="signupPage__form__name__first">
                <label htmlFor="fname">
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="John"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="signupPage__form__name__last">
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lanme"
                  name="lname"
                  placeholder="Deo"
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="email">
              E-mail <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
              onChange={handleChange}
            />
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <div className="signupPage__form__password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                required
                ref={passRef}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {isPassError.error && (
              <p className="signupPage__form__error">{isPassError.msg}</p>
            )}
            <label htmlFor="cPassword">
              Confirm Password <span>*</span>
            </label>
            <div className="signupPage__form__password">
              <input
                type="password"
                id="cPassword"
                name="cPassword"
                placeholder="Re-enter password"
                required
                ref={cPassRef}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setIsShowCPassword(!isShowCPassword)}
              >
                {isShowCPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {isCPassError.error && (
              <p className="signupPage__form__error">{isCPassError.msg}</p>
            )}
            <p className="signupPage__form__policy">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account.
            </p>
            <button type="submit" className="signupPage__form__btn">
              SIGN UP
            </button>
          </form>
          {/* <p className="signupPage__error">
            something went wrong try again later
          </p> */}
          <Link to="/login" className="signupPage__login__btn">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
