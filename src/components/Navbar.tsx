import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navBar">
      <div className="logo">
          <h2>Music Life</h2>                 
      </div>
      <ul>
        <Link to="/">
          <li className="active">
            Home
          </li>
        </Link>
        <Link to="/search">
        <li>
          Search
        </li>
        </Link>
        <Link to="/library">
        <li>
          Your Library
        </li>
        </Link>
      </ul>
      <div className="byStanislav">
        <span>by</span>
        <span>Stanislav Cucuruzac</span>
      </div>
    </div>

  )
}