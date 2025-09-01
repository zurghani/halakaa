import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { ActionButton } from "../../components/Button/ActionButton";
import { Paths } from "../../Routes";
import EnrollmentsTable from "./Enrollments/EnrollmentsTable";
import StudentSelectModal from "./Enrollments/StudentSelectModal";
import { useStudents } from "../../queries/students";
import {
    useCreateEnrollment,
    useDeleteEnrollment,
    useEnrollments,
} from "../../queries/enrollments";
import { EnrollmentWithStudents, Student } from "../../types";
import SaveSuccessModal from "../../components/Modals/Success";
import DeleteConfirmModal from "../../components/Modals/Delete";
import dayjs from "dayjs";

const EnrollmentsEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { id: classId } = useParams<{ id: string }>();

    const { data: students, isLoading: studentsLoading } = useStudents({ classId: classId });
    const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments({
        classId: classId,
    });

    const createEnrollmentMutation = useCreateEnrollment();
    const deleteEnrollmentMutation = useDeleteEnrollment();

    const [enrollmentsData, setEnrollmentsData] = useState<EnrollmentWithStudents[]>(
        enrollments || []
    );
    const [toBeCreatedEnrollments, setToBeCreatedEnrollments] = useState<EnrollmentWithStudents[]>(
        []
    );
    const [toBeDeletedEnrollments, setToBeDeletedEnrollments] = useState<Number[]>([]);

    const [selectStudentModalOpen, setSelectStudentModalOpen] = useState(false);
    const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSave = () => {
        const classIdNum = parseInt(classId ?? "");
        if (isNaN(classIdNum)) {
            console.error("Invalid class ID");
            return;
        }

        toBeCreatedEnrollments.forEach((enrollment) => {
            createEnrollmentMutation.mutate({
                studentId: enrollment.student.id,
                classId: classIdNum,
            });
        });
        toBeDeletedEnrollments.forEach((id) => {
            deleteEnrollmentMutation.mutate(id.toString());
        });
        setIsSaveSuccessModalOpen(true);
    };

    const handleCreateEnrollments = (students: Student[]) => {
        const newEnrollments: EnrollmentWithStudents[] = students.map((student) => ({
            id: Math.floor(Math.random() * -1000), // Temporary negative ID for new enrollments
            student: { id: student.id, name: student.fullName },
            createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        }));
        setToBeCreatedEnrollments((prev) => [...prev, ...newEnrollments]);
        setSelectStudentModalOpen(false);
    };

    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            if (toBeCreatedEnrollments.find((enrollment) => enrollment.id === deleteId)) {
                setToBeCreatedEnrollments((prev) =>
                    prev.filter((enrollment) => enrollment.id !== deleteId)
                );
            } else {
                setToBeDeletedEnrollments((prev) => [...prev, deleteId]);
            }
            setEnrollmentsData((prev) => prev.filter((enrollment) => enrollment.id !== deleteId));
        }
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
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
    }, [t, toBeCreatedEnrollments, toBeDeletedEnrollments]);
    useEffect(() => {
        if (!enrollmentsLoading && !studentsLoading) {
            setEnrollmentsData(enrollments || []);
        }
    }, [enrollments, students, enrollmentsLoading, studentsLoading]);
    return (
        <>
            <EnrollmentsTable
                enrollments={[...(enrollmentsData || []), ...toBeCreatedEnrollments]}
                editable
                onDelete={handleDeleteRequest}
                onCreate={() => setSelectStudentModalOpen(true)}
            />
            <SaveSuccessModal
                isOpen={isSaveSuccessModalOpen}
                onClose={() => setIsSaveSuccessModalOpen(false)}
                navigatePath={Paths.CLASS.VIEW.replace(":id", classId ?? "")}
                title={t("modal.enrollments.createSuccess")}
                message={t("modal.doneMessage")}
            />
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title={t("modal.enrollments.deleteTitle")}
                message={t("modal.enrollments.deleteConfirmation")}
            />
            <StudentSelectModal
                open={selectStudentModalOpen}
                onCancel={() => setSelectStudentModalOpen(false)}
                onCreate={handleCreateEnrollments}
                onSelect={() => {}}
            />
        </>
    );
};
export default EnrollmentsEditPage;
