import React, { useEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth.slice";
import "./Login.scss";
import { AppStore } from "../../store";
import { useNavigate } from "react-router-dom";

// place login component here

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: AppStore) => state.auth.isAuthenticated
  );

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
        login
      </Button>
    </div>
  );
};

export default Login;
