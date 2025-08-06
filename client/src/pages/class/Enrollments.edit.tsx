import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Enrollment } from "./types";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { ActionButton } from "../../components/Button/ActionButton";
import { Paths } from "../../Routes";
import EnrollmentsTable from "./EnrolledStudents/EnrollmentsTable";
import { enrollmentsDummy } from "./EnrolledStudents/enrolled.students.dummy";

const EnrollmentsEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [enrollments, setEnrollments] = useState<Enrollment[]>(enrollmentsDummy);

    const handleSave = () => {
        console.log("Saving enrollments:", enrollments);
        // TODO: Replace with API call
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.editEnrollments")));
    }, [t]);

    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button key="cancel" onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton key="save" onClick={handleSave}>
                {t("general.save")}
            </ActionButton>,
        ]);
    }, [t, enrollments]);
    return (
        <EnrollmentsTable
            data={enrollments}
            editable
            onDelete={(id) => setEnrollments((prev) => prev.filter((t) => t.id !== id))}
            onCreate={() =>
                setEnrollments([
                    ...enrollments,
                    { id: 5, classId: 1, studentId: 1, createdAt: new Date() },
                ])
            }
        />
    );
};
export default EnrollmentsEditPage;
