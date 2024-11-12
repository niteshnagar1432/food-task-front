import React from "react";
import "../css/Home.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Header />
      <div className="home-area-box">
        <h1>Welcome to The Foods Kitchen</h1>
        <Link to={"/menu"}>Go to Menu</Link>
      </div>
    </>
  );
}

export default Home;
