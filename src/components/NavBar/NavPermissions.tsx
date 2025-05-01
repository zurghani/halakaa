import React, { JSX } from "react";
import {
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined,
  ContactsOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { NavigateFunction } from "react-router-dom";
import { UserRole } from "../../store/user.slice";
import { TFunction } from "i18next";

type NavPermissionsType = {
  [key in UserRole | "non"]?: {
    name: string;
    icon: React.ElementType;
    dropdown?: { key: string; label: JSX.Element }[];
  }[];
};

export const NavPermissions = (
  navigate: NavigateFunction,
  t: TFunction<"translation", undefined>
) => {
  const permissions: NavPermissionsType = {
    admin: [
      {
        name: "student",
        icon: UserOutlined,
        dropdown: [
          {
            key: "admin-create-student",
            label: <a onClick={() => navigate("/home")}>{t("create")}</a>,
          },
          {
            key: "admin-find-student",
            label: <a onClick={() => navigate("/home")}>Find</a>,
          },
        ],
      },
      {
        name: "teacher",
        icon: TeamOutlined,
        dropdown: [
          {
            key: "admin-create-teacher",
            label: <a onClick={() => navigate("/home")}>Create</a>,
          },
          {
            key: "admin-find-teacher",
            label: <a onClick={() => navigate("/home")}>Find</a>,
          },
        ],
      },
      {
        name: "class",
        icon: ApartmentOutlined,
        dropdown: [
          {
            key: "admin-create-class",
            label: <a onClick={() => navigate("/home")}>Create</a>,
          },
          {
            key: "admin-find-class",
            label: <a onClick={() => navigate("/home")}>Find</a>,
          },
        ],
      },
      {
        name: "user",
        icon: ContactsOutlined,
        dropdown: [
          {
            key: "admin-create-user",
            label: <a onClick={() => navigate("/home")}>Create</a>,
          },
          {
            key: "admin-find-user",
            label: <a onClick={() => navigate("/home")}>Find</a>,
          },
        ],
      },
      { name: "reports", icon: BarChartOutlined },
      { name: "system settings", icon: SettingOutlined },
    ],
    teacher: [
      {
        name: "student",
        icon: UserOutlined,
        dropdown: [
          {
            key: "teacher-find-student",
            label: <a onClick={() => navigate("/home")}>Find</a>,
          },
        ],
      },
      {
        name: "class",
        icon: ApartmentOutlined,
        dropdown: [
          {
            key: "teacher-find-class",
            label: <a onClick={() => navigate("/home")}>Find</a>,
          },
        ],
      },
      { name: "reports", icon: BarChartOutlined },
      { name: "settings", icon: SettingOutlined },
    ],
    parent: [],
    student: [],
  };
  return permissions;
};
