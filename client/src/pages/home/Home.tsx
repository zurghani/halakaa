import React from "react";
import { useTranslation } from "react-i18next";
import EditTaskModal from "../class/components/EditTaskModal";

const Home: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("app.title")}</h1>
            <p>{t("app.description")}</p>
            <EditTaskModal />
        </div>
    );
};

export default Home;
