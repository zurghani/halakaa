import React from "react";
import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppStore } from "../../store";
import { NavPermissions } from "./NavPermissions";

const NavBarLinks: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userRole = useSelector((state: AppStore) => state.user.role) || "admin";
  const permissions = NavPermissions(navigate, t);

  return (
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
              <span className="navbar__item__title">
                {<IconComponent className="navbar__item__icon" />}
                {t(`navBar.${currentName}`)}
              </span>
            </Dropdown>
          );
        })}
      </div>
    </div>
  );
};

export default NavBarLinks;
