import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import { AppStore } from "./store";
import AppRoutes from "./Routes";
import "./App.scss";

function App() {
  const isDarkMode = useSelector((state: AppStore) => state.ui.isDarkMode);
  const direction = useSelector((state: AppStore) => state.ui.direction);

  return (
    <>
      <ConfigProvider
        direction={direction}
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          // token: { fontFamily: "Zain" },
        }}>
        <div
          className={isDarkMode ? "App App--dark" : "App App--light"}
          dir={direction}>
          <AppRoutes />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
