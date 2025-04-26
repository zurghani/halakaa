import { ConfigProvider, theme } from "antd";
import AppRoutes from "./Routes";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import "./App.scss";

function App() {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  const direction = useSelector((state: RootState) => state.ui.direction);

  return (
    <>
      <ConfigProvider
        direction={direction}
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          // token: { fontFamily: "Zain" },
        }}
      >
        <div
          className={isDarkMode ? "App App--dark" : "App App--light"}
          dir={direction}
        >
          <AppRoutes />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
