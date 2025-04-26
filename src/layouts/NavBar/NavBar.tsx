import React from "react";
// navbar component goes here
import "./NavBar.scss";
import { useDispatch } from "react-redux";
import { setDirection, toggleDarkMode } from "../../store/ui.slice";
import { Button } from "antd";
const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  const darkModeToggle = () => {
    dispatch(toggleDarkMode());
  };
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
      onClick={darkModeToggle}
    >
      Toggle Dark Mode
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
        </span>
      </div>
    </>
  );
};

export default NavBar;
