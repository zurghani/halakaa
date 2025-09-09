import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Grid, Space } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import UserSearchForm from "./components/find/SearchForm.user";
import UserList from "./components/find/User.list";
import UserTable from "./components/find/User.table";
import { UserSearchOptionsType } from "./types";
import { authClient } from "../../lib/auth-client";

const { useBreakpoint } = Grid;
const UserSearchOptions: UserSearchOptionsType = {
    name: { value: "name", label: "name" },
    email: { value: "email", label: "email" },
    phone: { value: "phone", label: "phone" },
};

const UserFindPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { setButtons } = useSetButtons();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchUsers = async (searchParams?: any) => {
        setLoading(true);
        try {
            // Check current session and permissions
            const session = await authClient.getSession();

            const result = await authClient.admin.listUsers({
                query: {
                    // limit: 50,
                    offset: 0,
                    ...searchParams,
                },
            });

            if (result.data) {
                setUsers(result.data.users);
                setTotalUsers(result.data.total);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            console.error("Full error details:", error);
        } finally {
            setLoading(false);
        }
    };

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

    // Load users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <h2>{t("general.searchBy")}</h2>
            {/* <UserSearchForm SearchOptions={UserSearchOptions} onSearch={fetchUsers} /> */}
            {`${t("general.resultsFound")} ${totalUsers}`}
            {isMobile ? <UserList users={users} /> : <UserTable users={users} />}
        </Space>
    );
};

export default UserFindPage;
