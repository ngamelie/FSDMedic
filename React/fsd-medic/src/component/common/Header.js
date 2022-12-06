import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../helpers/AuthContext";
import "./stylecommon.css";

function Header() {
  const { authRole, setAuthRole, authEmail, setAuthEmail } =
    useContext(AuthContext);
  let buttontest = null;

  if (authRole == 0) {
    buttontest = (
      <>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  } else if (authRole == 1) {
    buttontest = (
      <>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/appointment" className="btn-get-started">
                Make Appoinment
              </Link>
            </li>
            <li>
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
            <li>{authEmail}</li>
          </ul>
        </nav>
      </>
    );
  } else if (authRole == 2) {
    buttontest = (
      <>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/doctor" className="btn-get-started">
                Patient Records
              </Link>
            </li>
            <li>
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
            <li>{authEmail}</li>
          </ul>
        </nav>
      </>
    );
  } else if (authRole == 3) {
    buttontest = (
      <>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/admin" className="btn-get-started">
                Admin
              </Link>
            </li>
            <li>
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
            <li>{authEmail}</li>
          </ul>
        </nav>
      </>
    );
  }

  //console.log(authState);

  return (
    <div id="header" class="fixed-top">
      <div className="container d-flex align-items-center">
        <Link to="/" className="logo">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="logo"
            class="img-fluid"
          />
        </Link>
        <nav id="navbar" className="navbar order-last order-lg-0 me-auto">
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <> {buttontest} </>
      </div>
    </div>
  );
}

export default Header;
