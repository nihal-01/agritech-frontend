import React from "react";
import { Link } from "react-router-dom";

import "./Hero.scss";
import { heroBg, heroDesign, naturalImg } from "../../../assets/images";

function Hero() {
  return (
    <section className="hero">
      <div></div>
      <div className="hero__content">
        <img className="hero__natural__img" src={naturalImg} alt="" />
        <h2>
          Eat Organic <br />& Healthy Food
        </h2>
        <p>
          Eat local, Box contents change weakly to reflect the season's best
        </p>
        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>
      <img className="hero__bg" src={heroBg} alt="" />
      <img className="hero__design__img" src={heroDesign} alt="" />
    </section>
  );
}

export default Hero;
