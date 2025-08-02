import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { CaretLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { UserForm } from "./components/UserForm";

const UserCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log("Submitted:", values);
        // Create user here
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.createUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <Button onClick={() => form.submit()} icon={<CaretLeftOutlined />}>
                {t("general.create")}
            </Button>,
        ]);
    }, [t]);
    return <UserForm form={form} onSubmit={handleSubmit} />;
};
export default UserCreatePage;
