import React from "react";
import { useTranslation } from "react-i18next";
import ParentStudentList from "./components/ParentStudentList/ParentStudent.list";

const ParentHome: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("welcome")}</h1>
            <p>{t("parent.homeHeader")}</p>
            <ParentStudentList />
        </div>
    );
};

export default ParentHome;
