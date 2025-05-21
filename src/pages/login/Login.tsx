import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth.slice";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import { Paths } from "../../Routes";

// place login component here

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log(t("login"));
  return (
    <div className="page">
      <LanguageSelect />
      <Button
        color="cyan"
        variant="solid"
        className="button"
        onClick={() => {
          dispatch(login());
          navigate(Paths.HOME.ROOT);
        }}>
        {t("login")}
      </Button>
    </div>
  );
};

export default Login;
