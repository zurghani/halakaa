import { useState } from "react";
import Loggedin from "./layouts/Loggedin";
import { Button, ConfigProvider, theme } from "antd";
import "./App.scss";

function App() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const darkModeToggle = () => {
    setIsDarkmode(!isDarkmode);
  };
  const componentA = <Button type="primary">Admin Component A</Button>;
  const componentB = <Button type="default">تجربة</Button>;
  const componentC = (
    <Button type="dashed" onClick={darkModeToggle}>
      Student Component C
    </Button>
  );
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkmode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          // token: { fontFamily: "Zain" },
        }}
      >
        <div className={isDarkmode ? "App App--dark" : "App App--light"}>
          <Loggedin>{componentC}</Loggedin>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
