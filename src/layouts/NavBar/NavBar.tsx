import React from "react";
// navbar component goes here
// use this code for reference
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDirection, toggleDarkMode } from "../../store/ui.slice";
import { Button } from "antd";
import { login, logout } from "../../store/auth.slice";
import { AppStore } from "../../store";
const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector(
    (state: AppStore) => state.auth.isAuthenticated
  );

  const English = (
    <Button
      type="default"
      style={{ margin: "0px 5px" }}
      onClick={() => dispatch(setDirection("ltr"))}
    >
      English
    </Button>
  );
  const Arabic = (
    <Button
      type="default"
      style={{ margin: "0px 5px" }}
      onClick={() => dispatch(setDirection("rtl"))}
    >
      العربية
    </Button>
  );
  const DarkMode = (
    <Button
      type="dashed"
      style={{ margin: "0px 5px" }}
      onClick={() => dispatch(toggleDarkMode())}
    >
      Toggle Dark Mode
    </Button>
  );
  const Login = (
    <Button
      color="cyan"
      variant="outlined"
      style={{ margin: "0px 5px" }}
      onClick={() => dispatch(login())}
    >
      login
    </Button>
  );
  const Logout = (
    <Button
      color="red"
      variant="outlined"
      style={{ margin: "0px 5px" }}
      onClick={() => dispatch(logout())}
    >
      logout
    </Button>
  );
  return (
    <>
      <div className="navbar">
        NavBar component
        <span style={{ margin: "0px 5px" }}>
          {English}
          {Arabic}
          {DarkMode}
          {isloggedIn ? Logout : Login}
        </span>
      </div>
    </>
  );
};

export default NavBar;
