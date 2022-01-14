import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./LoginCard.scss";
import { useForm } from "../../../utils";

function LoginCard({ setIsLoginOpen }) {
  const [IsShowPassword, setIsShowPassword] = useState(false);
  const [user, handleChange] = useForm({ email: "", password: "" });

  const passRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  // password show hide functionality
  useEffect(() => {
    if (IsShowPassword) {
      passRef.current.type = "text";
    } else {
      passRef.current.type = "password";
    }
  }, [IsShowPassword]);

  return (
    <div className="loginCard">
      <div className="loginCard__header">
        <span>Sign in</span>
        <Link to="/signup" onClick={() => setIsLoginOpen(false)}>
          Create an Account
        </Link>
      </div>
      <form className="loginCard__form" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email Address <span>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">
          Password <span>*</span>
        </label>
        <div className="loginCard__form__password">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passRef}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setIsShowPassword(!IsShowPassword)}
          >
            {IsShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <button type="submit" className="loginCard__form__btn">
          LOGIN
        </button>
      </form>
      <Link
        to="/my-account/lost-password"
        className="loginCard__lostpassword"
        onClick={() => setIsLoginOpen(false)}
      >
        Lost your password?
      </Link>
    </div>
  );
}

export default React.memo(LoginCard);
