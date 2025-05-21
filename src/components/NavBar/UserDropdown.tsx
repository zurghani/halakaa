import React from "react";
import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store";
import { logout } from "../../store/auth.slice";
import profile_pic from "../../assets/profile_placeholder.png";

const UserDropDown: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const username = useSelector((state: AppStore) => state.user.name) || "temp";
  const userDropDown = [
    {
      key: "1",
      label: (
        <a href="" onClick={() => dispatch(logout())}>
          {t("navBar.logout")}
        </a>
      ),
    },
    {
      key: "2",
      label: <a href="">{t("navBar.settings")}</a>,
    },
  ];
  return (
    <span className="navbar__toolbar__item">
      <Dropdown key={username} menu={{ items: userDropDown }}>
        <div>
          <img
            src={profile_pic}
            alt="profile picture"
            className="navbar__toolbar__profilePicture"
          />
          {username}
        </div>
      </Dropdown>
    </span>
  );
};

export default UserDropDown;
