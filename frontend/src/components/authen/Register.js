import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, confirmPassword, displayName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(loginRes);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign Up</h5>
              {error && (
                <div class="alert alert-danger alert-dismissible fade show">
                  <strong>Error !</strong> {error}
                  <button
                    onClick={() => setError(undefined)}
                    type="button"
                    class="close"
                    data-dismiss="alert"
                  >
                    &times;
                  </button>
                </div>
              )}

              <form class="form-signin" onSubmit={submit}>
                <div class="form-label-group">
                  <input
                    id="inputEmail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    class="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                  />
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input
                    id="user"
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    class="form-control"
                    placeholder="Name"
                    required
                    autofocus
                  />
                  <label for="user">Name</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                    name="up"
                  />
                  <label for="inputPassword">Password</label>
                </div>
                <div class="form-label-group">
                  <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="inputPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    required
                    name="up2"
                  />
                  <label for="inputPassword">Confrim Password</label>
                </div>

                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign Up
                </button>
                <hr class="my-4" />
                <div class="row mb-4 px-3">
                  <small class="font-weight-bold">
                    Do you already have an account?{" "}
                    <Link to="/login">sign in</Link>
                  </small>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
