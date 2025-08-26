import React, { useEffect, useState } from "react";
import { Button, Form, Input, Typography, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { login } from "../../store/auth.slice";
import { Paths } from "../../Routes";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import "./Login.scss";
import { authClient } from "../../lib/auth-client";

const { Title } = Typography;

type FieldType = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

const Login: React.FC = () => {
    // const dispatch = useDispatch();

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { data, isPending } = authClient.useSession();

    const handleFinish = async (values: FieldType) => {
        const { email, password, rememberMe } = values;
        setLoading(true);
        try {
            const { error } = await authClient.signIn.email({ email, password, rememberMe });
            console.log(error);

            if (error) {
                form.setFields([
                    {
                        name: "password",
                        errors: [error.message || "something went wrong"],
                    },
                ]);
                return;
            }
            navigate(Paths.HOME.ROOT);
        } catch (err) {
            form.setFields([
                {
                    name: "password",
                    errors: ["Something went wrong"],
                },
            ]);
        } finally {
            setLoading(false);
        }
    };


    // temp

    useEffect(() => {
        if (data?.session) {
            navigate(Paths.HOME.ROOT);
        }
    }, [data]);

    if (isPending) {
        return null
    }
    return (
        <>
            <LanguageSelect />

            <div className="login">
                <Title className="login__title">{t("login.title")}</Title>
                <Title level={5} type="secondary" className="login__subtitle">
                    {t("login.subtitle")}
                </Title>

                <Form
                    className="login__form"
                    name="login"
                    initialValues={{ rememberMe: true }}
                    onFinish={handleFinish}
                    form={form}>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: t("login.validation.emailRequired") },
                            { type: "email", message: t("login.validation.emailInvalid") },
                        ]}>
                        <Input prefix={<UserOutlined />} placeholder={t("login.email")} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: t("login.validation.passwordRequired") },
                            { min: 8, message: t("login.validation.passwordMin") },
                        ]}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder={t("login.password")}
                        />
                    </Form.Item>

                    <Form.Item name="rememberMe" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit" loading={loading}>
                            {t("login.loginButton")}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Login;
