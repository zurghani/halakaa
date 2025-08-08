import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import { AppStore } from "./store";
import AppRoutes from "./Routes";
import "./App.scss";
import { useTranslation } from "react-i18next";

function App() {
    const { i18n } = useTranslation();
    const isDarkMode = useSelector((state: AppStore) => state.ui.isDarkMode);

    return (
        <>
            <ConfigProvider
                direction={i18n.dir()}
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: { fontFamily: "Cairo" },
                }}>
                <div className={isDarkMode ? "App App--dark" : "App App--light"} dir={i18n.dir()}>
                    <AppRoutes />
                </div>
            </ConfigProvider>
        </>
    );
}

export default App;
