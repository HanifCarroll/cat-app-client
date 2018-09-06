import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <ul className="header">
    <Link to="/">Home |</Link>
    <Link to="/cats"> View Cats </Link>
    <Link to="/cats/new">| New Cat</Link>
  </ul>
);

export default Header;
