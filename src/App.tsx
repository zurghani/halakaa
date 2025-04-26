import { useState } from "react";
import Loggedin from "./layouts/Loggedin";
import { Button, ConfigProvider, theme } from "antd";
import "./App.scss";

function App() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [direction, setDirection] = useState<"rtl" | "ltr">("rtl");
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
          <Loggedin>
            {componentC}
            {English}
            {Arabic}
          </Loggedin>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
