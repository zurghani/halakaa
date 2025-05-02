import React from "react";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import UserDropDown from "./UserDropdown";
import NavBarLinks from "./NavBarLinks";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <NavBarLinks />
        <div className="navbar__toolbar">
          <DarkModeToggle />
          <UserDropDown />
          <LanguageSelect />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
