import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div
      className="containe d-flex flex-md-row text-white flex-column gap-md-3"
      style={{ height: "100vh",width:"100vw" }}
    >
      {/* LEFT */}
      <div className="col col-sm-5 registerPage ">
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-2 m-3">Camping Site</h1>
          <i className="mb-5">
            Don't miss out on the opportunity to escape the city and enjoy some
            fresh air - register now to secure your spot at our campsite.
          </i>
        </div>
      </div>

      {/* RIGHT */}
      <div className="col col-sm-7 d-flex justify-content-center text-dark">
        <div className="d-flex justify-content-center align-items-center  flex-column">
          <h1 className="display-4"> Join Camping Site</h1>
          <div className="mb-5">
            Already have an account ?{" "}
            <a href="/" className="text-decoration-none">
              Login
            </a>{" "}
          </div>
          <form action="" className="d-flex flex-column gap-3 w-100">
            <div className="row g-3 align-items-center">
              <div className="col-3">
                <label htmlFor="inputUsername" className="col-form-label">
                  UserName
                </label>
              </div>
              <div className="col-9">
                <input
                  type="string"
                  id="inputUsername"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-3">
                <label htmlFor="inputEmail" className="col-form-label">
                  Email
                </label>
              </div>
              <div className="col-9">
                <input type="email" id="inputEmail" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="inputPassword" className="col-form-label">
                  Password
                </label>
              </div>
              <div className="col-9">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                />
              </div>
            </div>
            <button className="bg-dark text-white rounded mb-3">Join</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
