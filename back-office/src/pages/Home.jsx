import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        border: "2px solid green",
        height: "50px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        fontSize: "1.5em"
      }}
    >
      <Link to="/users">Users</Link>
      <Link to="/places">Places</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
