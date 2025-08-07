import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Enrollment, Student } from "./types";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { ActionButton } from "../../components/Button/ActionButton";
import { Paths } from "../../Routes";
import EnrollmentsTable from "./Enrollments/EnrollmentsTable";
import { enrollmentsDummy } from "./Enrollments/enrolled.students.dummy";
import StudentSelectModal from "./Enrollments/StudentSelectModal";

const dummyStudents: Student[] = [
    { id: 1, fullName: "Alice Johnson", gender: "female" },
    { id: 2, fullName: "Bob Smith", gender: "male" },
    { id: 3, fullName: "Clara Nguyen", gender: "female" },
    { id: 4, fullName: "David Brown", gender: "male" },
    { id: 5, fullName: "Eva Davis", gender: "female" },
];

const EnrollmentsEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [enrollments, setEnrollments] = useState<Enrollment[]>(enrollmentsDummy);
    const [selectStudentModalOpen, setSelectStudentModalOpen] = useState(false);

    const handleSave = () => {
        console.log("Saving enrollments:", enrollments);
        // TODO: Replace with API call
    };

    const handleStudentSelected = (student: Student) => {
        const nextId = Math.max(0, ...enrollments.map((e) => e.id)) + 1;

        const newEnrollment: Enrollment = {
            id: nextId,
            studentId: student.id,
            studentName: student.fullName,
            classId: 1,
        };

        setEnrollments((prev) => [...prev, newEnrollment]);
        setSelectStudentModalOpen(false);
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
        <>
            <EnrollmentsTable
                enrollments={enrollments}
                editable
                onDelete={(id) => setEnrollments((prev) => prev.filter((t) => t.id !== id))}
            />
            <div
                style={{
                    marginTop: "2rem",
                    textAlign: "center",
                }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setSelectStudentModalOpen(true)}>
                    {t("general.enrollment")}
                </Button>
            </div>
            <StudentSelectModal
                open={selectStudentModalOpen}
                students={dummyStudents}
                onCancel={() => setSelectStudentModalOpen(false)}
                onSelect={handleStudentSelected}
            />
        </>
    );
};
export default EnrollmentsEditPage;
