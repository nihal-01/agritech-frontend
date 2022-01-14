import React from "react";
import { BlankSpace, Hero } from "../../../components/customer";

function HomePage() {
  return (
    <div className="homePage">
      <Hero />
      <div className="homePage__main">
        <BlankSpace />
      </div>
    </div>
  );
}

export default HomePage;
