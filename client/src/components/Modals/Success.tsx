import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./modals.scss"; 

type SaveSuccessModalProps = {
    isOpen: boolean;
    onClose: () => void;
    navigatePath?: any;
    title: string;
    message: string;
};

const SaveSuccessModal: React.FC<SaveSuccessModalProps> = ({ isOpen, onClose, navigatePath, title, message }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleDone = () => {
        onClose(); // Close the modal
        navigatePath && navigate(navigatePath);
    };

    return (
        <Modal
            className="modal"
            open={isOpen}
            footer={[
                <Button key="done" type="primary" onClick={handleDone}>
                    {t("modal.done")}
                </Button>,
            ]}
            okText={t("modal.done")}
            okType="primary"
            onCancel={handleDone} // to close modal with Esc key
            centered
            closable={false}
            maskClosable={false}
            keyboard
            title={
                <div className="modal__title">
                    <CheckCircleOutlined className="modal__title__success-icon" />
                    {title}
                </div>
            }>
            {message}
        </Modal>
    );
};
export default SaveSuccessModal;
