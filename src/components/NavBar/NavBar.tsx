import React from "react";
import { Button, Dropdown, MenuProps } from "antd";
import { QuestionCircleOutlined, GlobalOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../store/auth.slice";
import { AppStore } from "../../store";
import { NAV_LINKS } from "./navLinks";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./NavBar.scss";

interface NavbarProps {
  userRole: string;
  username: string;
}


const NavBar: React.FC = ({ userRole, username }: NavbarProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userDropDown = [
    {
      key: '1',
      label: (
        <a href="" onClick={() => dispatch(logout())}>
          {t("navBar.logout")}
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href="">
          {t("navBar.settings")}
        </a>

      ),
    },
  ]

  // const direction = useSelector((state: AppStore) =>{ return state.ui.direction })
  return (
    <>

      <nav className="navbar">
        <div className="navbar__left">
          <div className="navbar__links">
            {(NAV_LINKS[userRole] || []).map((link: any) => {
              const IconComponent = link.icon; // Get the icon component
              const currentName = link.name
              const currentDropdown = link.dropdown ?? [];
              return (
                //NOT SURE HOW TO MAKE DROPDOWN ITEMS USE THE ARABIC TRANSLATION... switch back to previous method?
                <Dropdown key={currentName} menu={{ items: currentDropdown }} className="navbar__item">
                  <span className="navbar__item-content">
                    {<IconComponent className="navbar__item-icon" />}
                    {t(`navBar.${currentName}`)}
                  </span>
                </Dropdown>
              )
            })}
          </div>
        </div>

        <div className="navbar__toolbar">
          <DarkModeToggle />
          <span className="navbar__toolbar-item">
            <img src="src/components/navbar/pfp.png" alt="" className="navbar__userPfp" />
            <Dropdown key={username} menu={{items: userDropDown}}>
              {username}
            </Dropdown>
          </span>

          <div className="navbar__language-selector">
            {/* <GlobalOutlined className="toolbar-item" /> */}
            {/* WANT TO CHANGE THIS TO BE AN ICON WITH DROPDOWN? */}
            <LanguageSelect />
          </div>

        </div>

      </nav>
    </>
  );
};

export default NavBar;
