import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { ClassForm } from "./components/ClassForm";
import { ActionButton } from "../../components/Button/ActionButton";
import dayjs from "dayjs";

const dummyClass = {
    description: "Revision Class",
    startsAt: dayjs("2025-08-03T09:00:00"), // 9:00 AM
    endsAt: dayjs("2025-08-03T10:30:00"), // 10:30 AM
    teacher: ["002"], // AntD expects array in mode="tags"
    ageGroup: ["6-8"], // same here
};

const ClassEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (values: any) => {
        console.log("Editted:", values);
        // edit the class logic here
        setIsModalOpen(true);
    };

    const handleDone = () => {
        setIsModalOpen(false);
        navigate(Paths.CLASS.FIND); //redirects to classes list page
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.editClass")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.CLASS.FIND)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton onClick={() => form.submit()}>{t("general.save")}</ActionButton>,
        ]);
    }, [t]);
    return (
        <>
        <ClassForm form={form} defaultValues={dummyClass} onSubmit={handleSubmit} />
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
            title={t("modal.class.updateSuccess")}
            >
            {t("modal.doneText")}
            </Modal>
        </>
    );
};
export default ClassEditPage;
