import React from "react";

import Footer from "../../components/Footer";

type Props = {};

const Login = (props: Props) => {
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
          <div className="card-body " style={{ width: "20rem" }}>
            <h2 className="card-title m-3">Login</h2>
            <hr></hr>
            <form className="text-center ">
              <div className="mb-3 ">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-4 ">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  autoFocus
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
