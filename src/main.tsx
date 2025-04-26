import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import "./main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      direction="rtl"
      theme={{
        algorithm: theme.darkAlgorithm,
        // token: { fontFamily: "Zain" },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
