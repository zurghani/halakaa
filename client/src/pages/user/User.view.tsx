import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { UserForm } from "./components/UserForm";
import { User } from "../../types";
import { UserRole } from "../../types";
import { ActionButton } from "../../components/Button/ActionButton";

const dummyUser = {
    id: "1",
    name: "Zacharea K",
    email: "zachrea@gmail.com",
    phone: "+1234567890",
    language: "en",
    role: UserRole.Parent,
    children: [
        { id: "1", fullName: "Child 1", ageGroup: "5 - 7", dateOfBirth: "2017-05-20" },
        { id: "2", fullName: "Child 2", ageGroup: "8 - 10", dateOfBirth: "2014-03-15" },
        { id: "3", fullName: "Child 3", ageGroup: "11 - 13", dateOfBirth: "2011-07-30" },
    ],
};

const UserViewPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.viewUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton
                onClick={() => navigate(`${Paths.USER.EDIT.replace(":id", dummyUser.id || "")}`)}>
                {t("general.edit")}
            </ActionButton>,
        ]);
    }, [t]);
    return <UserForm form={form} disabled defaultValues={dummyUser} />;
};
export default UserViewPage;
