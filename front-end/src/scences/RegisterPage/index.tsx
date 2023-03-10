import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import { setLogin } from "../../state";

type Props = {};

const Register = (props: Props) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [errorMess]);
  const register = async (e: any) => {
    e.preventDefault();
    const registerResponse = await fetch("http://localhost:8080/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    }).then(async (response) => {
      const responseJson = await response.json();
      if (!response.ok) {
        setShowAlert(true);
        setErrorMess(responseJson.message);
      }
      return responseJson;
    });
    if (registerResponse.registerUser) {
      setUsername("");
      setPassword("");
      setEmail("");
      dispatch(
        setLogin({
          user: registerResponse.registerUser,
        })
      );
      navigate("/campsites");
    }
  };
  return (
    <div
      className="containe d-flex flex-md-row text-white flex-column gap-md-3"
      style={{ height: "100vh", width: "100vw" }}
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

      <div className="col col-sm-7 d-flex justify-content-center text-dark position-relative">
        <div className="d-flex justify-content-center align-items-center  flex-column">
          <h1 className="display-4"> Join Camping Site</h1>
          <div className="mb-5">
            Already have an account ?{" "}
            <a href="/login" className="text-decoration-none text-info">
              <b>Login</b>
            </a>{" "}
          </div>

          {showAlert && <Error error={errorMess} setShowAlert={setShowAlert} />}

          <form className="d-flex flex-column gap-3 w-100" onSubmit={register}>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
