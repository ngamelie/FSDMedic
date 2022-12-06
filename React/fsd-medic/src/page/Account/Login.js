import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import "./accountstyle.css";
import { AuthContext } from "../../helpers/AuthContext";
import config from "../../config/Config";
import { getRole, getEmail } from "../../helpers/handleJWT";

function Login() {
  const PATH = config().path;
  const [uemail, setUserEmail] = useState("");
  const [pword, setPassword] = useState("");
  const { authRole, setAuthRole, authEmail, setAuthEmail } = useContext(AuthContext);

  let navigate = useNavigate();

  // login the user
  const btn_login = (e) => {
    
    e.preventDefault();
    const user = { Username: uemail, Password: pword };
    Axios.post(PATH + "/Login", user).then((response) => {
      //console.log(response.data);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        
         localStorage.setItem("accessToken", response.data);
         //const role = getRole();
         setAuthRole(getRole());
         setAuthEmail(getEmail())
        //console.log(authState);
        alert("Login Successfully");
       
        navigate("/");
      }
    });
  };

  return (
    <div id="content">
      <div className="container">
        <div className="row">
          <div className="col-sm-5 auth-box">
            <div className="account-box-shadow">
              <h3 className="account-title">Login</h3>
              <form>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <input
                      name="username"
                      placeholder="Username"
                      className="form-control"
                      value={uemail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      value={pword}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="button-btn-block">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={btn_login}
                  >
                    Login
                  </button>
                </div>

                <div className="auth-footer-text">
                  <small>
                    New User,&nbsp;
                    <Link to="/register" className="nav-link">
                      Sign Up
                    </Link>
                    &nbsp;Here
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;