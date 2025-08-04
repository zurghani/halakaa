import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Form, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Paths } from "../../Routes";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { ClassForm } from "./components/ClassForm";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { ActionButton } from "../../components/Button/ActionButton";

const ClassCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (values: any) => {
        console.log("Submitted:", values);
        // Create class here
        setIsModalOpen(true);
    };

    const handleDone = () => {
        setIsModalOpen(false);
        navigate(Paths.CLASS.FIND); //redirects to classes list page
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.createClass")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.CLASS.FIND)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton onClick={() => form.submit()}>{t("general.create")}</ActionButton>,
        ]);
    }, [t]);
    return (
        <>
        <ClassForm form={form} onSubmit={handleSubmit} />
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
            title={t("modal.class.createSuccess")}
            >
            {t("modal.doneText")}
            </Modal>
        </>
    );
};
export default ClassCreatePage;
