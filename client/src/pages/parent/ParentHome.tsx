import React from "react";
import { useTranslation } from "react-i18next";
import ParentStudentList from "./components/ParentStudentList/ParentStudent.list";
import { useStudents } from "../../queries/students";
import { authClient } from "../../lib/auth-client";

const ParentHome: React.FC = () => {
    const { t } = useTranslation();
    const { data: auth } = authClient.useSession();
    const { data: students, isLoading } = useStudents({
        parentId: auth?.user.id,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(students);
    return (
        <div>
            <h1>{t("welcome")}</h1>
            <p>{t("parent.homeHeader")}</p>
            <ParentStudentList students={students ?? []} />
        </div>
    );
};

export default ParentHome;
