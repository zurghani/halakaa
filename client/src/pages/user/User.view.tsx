import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Segmented, Select } from "antd";
import { CaretLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import ChildrenTable from "./components/ChildrenTable";

const dummyUser = {
    id: "1",
    fullName: "Zacharea K",
    email: "zachrea@gmail.com",
    phone: "+1234567890",
    language: "en",
    role: "parent",
    children: [
        { id: "1", fullName: "Child 1", ageGroup: "5-7" },
        { id: "2", fullName: "Child 2", ageGroup: "8-10" },
        { id: "3", fullName: "Child 3", ageGroup: "11-13" },
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
        dispatch(setCurrentPageTitle(t("titles.editUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <Button
                onClick={() => navigate(`${Paths.USER.EDIT.replace(":id", dummyUser.id)}`)}
                icon={<CaretLeftOutlined />}>
                {t("general.edit")}
            </Button>,
        ]);
    }, [t]);
    return (
        <Form
            form={form}
            layout="vertical"
            style={{ padding: "20px", maxWidth: "40rem" }}
            onFinish={(values) => {
                console.log("Edited values:", values);
                // Handle user creation logic here
            }}
            initialValues={dummyUser}>
            <Form.Item
                name="fullName"
                label={t("forms.fullName")}
                rules={[{ required: true, message: t("forms.required.fullName") }]}>
                <Input disabled />
            </Form.Item>
            <Form.Item
                name="email"
                label={t("forms.email")}
                rules={[
                    { required: true, message: t("forms.required.email") },
                    { type: "email", message: t("forms.invalid.email") },
                ]}>
                <Input disabled />
            </Form.Item>
            <Form.Item
                name="phone"
                label={t("forms.phone")}
                rules={[{ required: true, message: t("forms.required.phone") }]}>
                <Input disabled />
            </Form.Item>
            <Form.Item
                name="language"
                label={t("forms.language")}
                rules={[{ required: true, message: t("forms.required.language") }]}>
                <Segmented
                    disabled
                    options={[
                        { value: "en", label: t("forms.selectLanguage.english") },
                        { value: "ar", label: t("forms.selectLanguage.arabic") },
                    ]}
                />
            </Form.Item>
            <Form.Item
                name="role"
                label={t("forms.role")}
                rules={[{ required: true, message: t("forms.required.role") }]}>
                <Select
                    disabled
                    options={[
                        { label: t("forms.selectRole.admin"), value: "admin" },
                        { label: t("forms.selectRole.teacher"), value: "teacher" },
                        { label: t("forms.selectRole.parent"), value: "parent" },
                    ]}
                />
            </Form.Item>
            {dummyUser.role === "parent" && (
                <Form.Item label={t("forms.children")}>
                    <ChildrenTable
                        childrenData={dummyUser.children}
                        onDelete={(id) => {
                            console.log("Delete child with id:", id);
                            // Handle child deletion logic here
                        }}
                    />
                </Form.Item>
            )}
        </Form>
    );
};
export default UserViewPage;
