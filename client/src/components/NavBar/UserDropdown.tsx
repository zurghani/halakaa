import React from "react";
import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import profile_pic from "../../assets/profile_placeholder.png";
import { authClient } from "../../lib/auth-client";

const UserDropDown: React.FC = () => {
    const { t } = useTranslation();
    const { signOut } = authClient;
    const { data } = authClient.useSession();

    const userDropDown = [
        {
            key: "1",
            label: (
                <a href="" onClick={() => signOut()}>
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
            <Dropdown key={data?.user.name} menu={{ items: userDropDown }}>
                <div>
                    <img
                        src={profile_pic}
                        alt="profile picture"
                        className="navbar__toolbar__profilePicture"
                    />
                    {data?.user.name}
                </div>
            </Dropdown>
        </span>
    );
};

export default UserDropDown;
