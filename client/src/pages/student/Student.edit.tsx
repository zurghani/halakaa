import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Button, Form, Modal } from "antd";
import { CaretLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { StudentForm } from "./components/StudentForm";
import { Student } from "./types";

const dummyStudent: Student = {
    fullName: "Zacharea K",
    gender: "male",
    dateOfBirth: dayjs("2000-01-01") as any,
    parentId: "parent123",
};

const StudentEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleSubmit = (values: any) => {
        console.log("Submitted:", values);
        // actually create the student
        setIsModalOpen(true);
    };

    const handleDone = () => {
        setIsModalOpen(false);
        navigate(Paths.STUDENT.FIND); //redirects to students list page
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
            <Button onClick={() => form.submit()} icon={<CaretLeftOutlined />}>
                {t("general.save")}
            </Button>,
        ]);
    }, [t]);
    return (
        <>
        <StudentForm form={form} onSubmit={handleSubmit} defaultValues={dummyStudent} />
        <Modal
            open={isModalOpen}
            footer={[
            <Button key="done" type="primary" onClick={handleDone}>
            {t("modal.done")}
            </Button>
            ]}
            onCancel={handleDone} // to close modal with Esc key
            centered
            closable={false}
            maskClosable={false}
            keyboard
            title={t("modal.student.updateSuccess")}
            >
            {t("modal.doneText")}
            </Modal>
        </>
    );
};
export default StudentEditPage;
