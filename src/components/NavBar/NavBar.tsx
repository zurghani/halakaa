import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../store/auth.slice";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <div className="navbar">
        NavBar component
        <span style={{ margin: "0px 5px" }}>
          <LanguageSelect />
          <DarkModeToggle />
          <Button
            color="red"
            variant="outlined"
            style={{ margin: "0px 5px" }}
            onClick={() => dispatch(logout())}>
            {t("logout")}
          </Button>
        </span>
      </div>
    </>
  );
};

export default NavBar;
