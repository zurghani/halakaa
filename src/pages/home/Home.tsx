import React from "react";
import { useTranslation } from "react-i18next";
import ClassDetailsCard from "../../components/ClassDetailsCard/ClassDetailsCard";

const Home: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("app.title")}</h1>
            <p>{t("app.description")}</p>
            <ClassDetailsCard></ClassDetailsCard>
        </div>
    );
};

export default Home;
