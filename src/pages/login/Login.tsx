import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch } from "react-redux";
import { login } from "../../store/auth.slice";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import { Paths } from "../../Routes";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
    <LanguageSelect />

    <div className="loginPage" 
    style={{
      minHeight: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '80vw',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>

      <h2 className="loginPage__title" 
       style={{
         fontWeight: "400",
         textAlign: "center",
        }}> {t("loginPage.title")} </h2>

      <p className="loginPage__subtitle" 
       style={{
         color: "#afafaf",
         fontSize: "0.62rem",
         marginBottom: "1rem",
         textAlign: "center",
        }}> {t("loginPage.supTitle")} </p>

      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        >
        <Form.Item
          name="username"
          rules={[
            { required: true, message:  t('loginPage.validation.passwordRequired') },
            { min: 3, message: t('loginPage.validation.usernameMin') },
            { max: 20, message: t('loginPage.validation.usernameMax') },
            { pattern: /^[a-zA-Z0-9._-]+$/, message: t('loginPage.validation.usernamePattern') },
          ]}
          >
          <Input 
            prefix={<UserOutlined />} 
            placeholder= {t("loginPage.username")}
            />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('loginPage.validation.passwordRequired') },
            { min: 8, message: t('loginPage.validation.passwordMin') },
          ]}
          >
          <Input.Password 
            prefix={<LockOutlined />} 
            type="password" 
            placeholder= {t("loginPage.password")}
            />
        </Form.Item>

        <Form.Item>
          <Button 
            style={{
              backgroundColor: "#7db406",
              visibility: "visible",
              boxShadow: "none",
            }}
            className="loginPage__submit"
            type="primary"
            block
            onClick={() => {
              dispatch(login());
              navigate(Paths.HOME.ROOT);
            }}>
            {t("login")}
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default Login;
