import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth.slice";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import { Paths } from "../../Routes";

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <LanguageSelect />

      <div className="login">
        <Title level={2}  className="login__title">
          {t("login.title")}
        </Title>
        <Title level={5} type="secondary" className="login__subtitle">
          {t("login.subtitle")}
        </Title>

        <Form name="login" initialValues={{ remember: true }}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: t("login.validation.passwordRequired"),
              },
              { min: 3, message: t("login.validation.usernameMin") },
              { max: 20, message: t("login.validation.usernameMax") },
              {
                pattern: /^[a-zA-Z0-9._-]+$/,
                message: t("login.validation.usernamePattern"),
              },
            ]}>
            <Input
              prefix={<UserOutlined />}
              placeholder={t("login.username")}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("login.validation.passwordRequired"),
              },
              { min: 8, message: t("login.validation.passwordMin") },
            ]}>
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder={t("login.password")}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              onClick={() => {
                dispatch(login());
                navigate(Paths.HOME.ROOT);
              }}>
              {t("login.loginButton")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
