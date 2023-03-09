import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";

import Footer from "../../components/Footer";
import { setLogin } from "../../state";

type Props = {};

const Login = (props: Props) => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/campsites");
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const loggedInResponse = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then(async (response) => {
      if (!response.ok) {
        setShowAlert(true);
        setErrorMess("Invalid username or password");
        return;
      }
      return response.json();
    });
    if (loggedInResponse) {
      setUserName("");
      setPassword("");
      dispatch(
        setLogin({
          user: loggedInResponse.user,
        })
      );
      navigate("/");
    }
  };
  return (
    <div className="login-background d-flex text-center text-white ">
      <div className="d-flex text-white text-center p-3 flex-column h-100 w-100">
        <h1 className="display-3">Camping Site</h1>
        <p className="lead">
          Welcome to the camping site! Sign in to access your account and
          finding your next outdoor adventure
        </p>

        <div
          className="container mt-5 bg-black border-3 rounded-4 bg-opacity-50"
          style={{ width: "22rem" }}
        >
          {showAlert && <Error error={errorMess} setShowAlert={setShowAlert} />}
          <div className="card-body " style={{ width: "20rem" }}>
            <h2 className="card-title m-3">Login</h2>
            <hr></hr>
            <form className="text-center" onSubmit={handleLogin}>
              <div className="mb-3 ">
                <label className="form-label">Username</label>
                <input
                  type="string"
                  autoFocus
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 ">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="button p-1 rounded-4 bg-primary bg-opacity-55 text-white w-50 fs-5">
                Login
              </button>
              <div className="form-text mb-3 text-white-50">
                New to CampSite ?{" "}
                <a href="/register" className="text-decoration-none">
                  Create an account
                </a>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
