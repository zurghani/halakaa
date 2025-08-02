import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Grid, Space } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import UserSearchForm from "./components/find/SearchForm.user";
import { FindUserResultDummyData } from "./components/find/dummy.data";
import UserList from "./components/find/User.list";
import UserTable from "./components/find/User.table";
import { UserSearchOptionsType } from "./types";

const { useBreakpoint } = Grid;
const UserSearchOptions: UserSearchOptionsType = {
    name: { value: "name", label: "Name" },
    email: { value: "email", label: "Email" },
    phone: { value: "phone", label: "Phone" },
};

const UserFindPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.findUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />}></Button>,
            <Button icon={<DownloadOutlined />}></Button>,
        ]);
    }, [t]);
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <h2>{t("general.searchBy")}</h2>
            <UserSearchForm SearchOptions={UserSearchOptions} />
            {`${t("general.resultsFound")} ${FindUserResultDummyData.length}`}
            {isMobile ? (
                <UserList users={FindUserResultDummyData} />
            ) : (
                <UserTable users={FindUserResultDummyData} />
            )}
        </Space>
    );
};

export default UserFindPage;
