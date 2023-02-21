import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setModeLightDark } from "../state";

type Props = {};

const Nav = (props: Props) => {
  const [mode, setMode] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const toggleLightDark = () => {
    setMode(mode === "light" ? "dark" : "light");
    dispatch(setModeLightDark());
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <div
      className={`container-fluid bg-${mode === "light" ? "white" : "dark"} `}
      data-bs-theme={`${mode}`}
    >
      <nav className={`navbar navbar-expand-lg p-3`}>
        <a className={`navbar-brand text-weight-bold fs-3`} href="#">
          Camping Site
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="example-collapse-text"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isOpen ? "show " : "flex-xl-row justify-content-xl-between "
          } `}
          id="navbarNav"
        >
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link fs-6 active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-6" href="#">
                Create Campsite
              </a>
            </li>
          </ul>

          {user ? (
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <a className="nav-link fs-6" href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>
              <li>
                {mode === "light" ? (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdDarkMode />
                  </button>
                ) : (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdLightMode className="text-white" />
                  </button>
                )}
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <a className="nav-link fs-6" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link fs-6" href="/">
                  Login
                </a>
              </li>
              <li>
                {mode === "light" ? (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdDarkMode />
                  </button>
                ) : (
                  <button className="btn" onClick={toggleLightDark}>
                    <MdLightMode className="text-white" />
                  </button>
                )}
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
