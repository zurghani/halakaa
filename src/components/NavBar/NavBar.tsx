import React from "react";
import { Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NavPermissions } from "./NavPermissions";
import { AppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import UserDropDown from "./UserDropdown";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userRole = useSelector((state: AppStore) => state.user.role) || "admin";
  const navigate = useNavigate();
  const permissions = NavPermissions(navigate, t);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          <div className="navbar__links">
            {(permissions[userRole] || []).map((link) => {
              const IconComponent = link.icon;
              const currentName = link.name;
              const currentDropdown = link.dropdown ?? [];
              return (
                <Dropdown
                  key={currentName}
                  menu={{ items: currentDropdown }}
                  className="navbar__item">
                  <span className="navbar__item-content">
                    {<IconComponent className="navbar__item-icon" />}
                    {t(`navBar.${currentName}`)}
                  </span>
                </Dropdown>
              );
            })}
          </div>
        </div>

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
