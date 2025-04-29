import React, { useEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth.slice";
import "./Login.scss";
import { AppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// place login component here

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuthenticated = useSelector(
    (state: AppStore) => state.auth.isAuthenticated
  );
  console.log(t("login"));
  return (
    <div className="page">
      <Button
        color="cyan"
        variant="solid"
        className="button"
        onClick={() => {
          dispatch(login());
          navigate("/home");
        }}
      >
        {t("login")}
      </Button>
    </div>
  );
};

export default Login;
