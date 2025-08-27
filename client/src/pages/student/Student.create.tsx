import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { StudentForm } from "./components/StudentForm";
import SaveSuccessModal from "../../components/Modals/Success";
import { NewStudent } from "../../types";
import { useCreateStudent } from "../../queries/students";
import { ActionButton } from "../../components/Button/ActionButton";

const StudentCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const createStudentMutation = useCreateStudent();

    const handleSubmit = (values: NewStudent) => {
        console.log("Submitted:", values);

        createStudentMutation.mutate(values, {
            onSuccess: () => {
                setIsSuccessModalOpen(true);
            },
        });
    };
    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.createUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton onClick={() => form.submit()}>{t("general.create")}</ActionButton>,
        ]);
    }, [t]);
    return (
        <>
            <StudentForm form={form} onSubmit={handleSubmit} />
            <SaveSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                navigatePath={Paths.STUDENT.VIEW}
                title={t("modal.student.createSuccess")}
                message={t("modal.doneMessage")}
            />
        </>
    );
};
export default StudentCreatePage;
