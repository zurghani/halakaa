import { useState } from "react";
import { Button, ConfigProvider, theme } from "antd";
import "./App.scss";
import AppRoutes from "./Routes";

function App() {
  const [isDarkmode, setIsDarkmode] = useState(true);
  const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");
  const darkModeToggle = () => {
    setIsDarkmode(!isDarkmode);
  };
  const English = (
    <Button type="primary" onClick={() => setDirection("ltr")}>
      English
    </Button>
  );
  const Arabic = (
    <Button type="default" onClick={() => setDirection("rtl")}>
      العربية
    </Button>
  );
  const componentC = (
    <Button type="dashed" onClick={darkModeToggle}>
      Toggle Dark Mode
    </Button>
  );
  return (
    <>
      <ConfigProvider
        direction={direction}
        theme={{
          algorithm: isDarkmode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          // token: { fontFamily: "Zain" },
        }}
      >
        <div
          className={isDarkmode ? "App App--dark" : "App App--light"}
          dir={direction}
        >
          <AppRoutes />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
