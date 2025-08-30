import React from "react";
import { useTranslation } from "react-i18next";
import ParentStudentList from "./components/ParentStudentList/ParentStudent.list";
import { useStudents } from "../../queries/students";

const ParentHome: React.FC = () => {
    const { t } = useTranslation();
    const { data: students, isLoading } = useStudents({
        parentId: "d6dca3a6-76e1-4300-8406-dea962c50f06", //TODO: LOAD PARENT ID FROM USER.
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>{t("welcome")}</h1>
            <p>{t("parent.homeHeader")}</p>
            <ParentStudentList students={students ?? []} />
        </div>
    );
};

export default ParentHome;
