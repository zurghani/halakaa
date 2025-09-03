import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { StudentForm } from "./components/StudentForm";
import SaveSuccessModal from "../../components/Modals/Success";
import { ActionButton } from "../../components/Button/ActionButton";
import { useStudent, useUpdateStudent } from "../../queries/students";
import dayjs from "dayjs";
import { StudentFormValues } from "../../types";

const StudentEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const updateStudentMutation = useUpdateStudent();
    const handleSubmit = (values: StudentFormValues) => {
        const student = {
            studentId: id || "",
            updates: {
                fullName: values.fullName,
                gender: values.gender,
                parentId: values.parentId,
                userId: values.userId,
                dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null,
            },
        };
        updateStudentMutation.mutate(student, {
            onSuccess: () => {
                setIsSuccessModalOpen(true);
            },
        });
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.editUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton onClick={() => form.submit()}>{t("general.save")}</ActionButton>,
        ]);
    }, [t]);
    const { data: initialStudent, isLoading } = useStudent(id || "");

    const formInitialValues = initialStudent
        ? {
              ...initialStudent,
              dateOfBirth: initialStudent?.dateOfBirth ? dayjs(initialStudent.dateOfBirth) : null,
          }
        : undefined;

    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <StudentForm form={form} onSubmit={handleSubmit} initialValues={formInitialValues} />
            <SaveSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                navigatePath={Paths.STUDENT.VIEW}
                title={t("modal.student.updateSuccess")}
                message={t("modal.doneMessage")}
            />
        </>
    );
};
export default StudentEditPage;
