import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
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
              <h5 class="card-title text-center">Sign In</h5>
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
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                  />
                  <label for="inputPassword">Password</label>
                </div>

                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign in
                </button>
                <hr class="my-4" />
                <div class="row mb-4 px-3">
                  {" "}
                  <small class="font-weight-bold">
                    Don't have an account? <Link to="/register">Sign Up</Link>
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
