import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Radio, Select } from "antd";
import { CaretLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";

const UserCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

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
    return (
        <Form
            form={form}
            layout="vertical"
            style={{ padding: "20px", maxWidth: "40rem" }}
            onFinish={(values) => {
                console.log("Submitted values:", values);
                // Handle user creation logic here
            }}>
            <Form.Item
                name="fullName"
                label={t("forms.fullName")}
                rules={[{ required: true, message: t("forms.required.fullName") }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label={t("forms.email")}
                rules={[
                    { required: true, message: t("forms.required.email") },
                    { type: "email", message: t("forms.invalid.email") },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label={t("forms.phone")}
                rules={[{ required: true, message: t("forms.required.phone") }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="language"
                label={t("forms.language")}
                rules={[{ required: true, message: t("forms.required.language") }]}>
                <Radio.Group>
                    <Radio.Button value="en">{t("forms.selectLanguage.english")}</Radio.Button>
                    <Radio.Button value="ar">{t("forms.selectLanguage.arabic")}</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="role"
                label={t("forms.role")}
                rules={[{ required: true, message: t("forms.required.role") }]}>
                <Select
                    options={[
                        { label: t("forms.selectRole.admin"), value: "admin" },
                        { label: t("forms.selectRole.teacher"), value: "teacher" },
                        { label: t("forms.selectRole.parent"), value: "parent" },
                    ]}
                />
            </Form.Item>
        </Form>
    );
};
export default UserCreatePage;
