import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user", "");
  };

  return (
    <>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <nav class="collapse navbar-collapse " id="navbarTogglerDemo01">
        {userData.user || localStorage.getItem("auth-token") ? (
          <ul class="navbar-nav ml-auto ">
            <Link onClick={logout}>
              <button type="button" class="btn btn-outline-primary">
                Log out
              </button>
            </Link>
          </ul>
        ) : (
          <ul class="navbar-nav my-2 my-lg-0 ml-auto">
            <li class="nav-item">
              <Link onClick={register}>
                <button type="button" class="btn btn-outline-primary">
                  Sign Up
                </button>
              </Link>
            </li>
            <li class="nav-item ">
              <Link onClick={login}>
                <button type="button" class="btn btn-outline-primary">
                  Log In
                </button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}
