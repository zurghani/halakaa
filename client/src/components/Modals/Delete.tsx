import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./modals.scss"; 

type DeleteConfirmModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
};

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onConfirm, onCancel, title, message}) => {
    const { t } = useTranslation();

    const handleCancel = () => {
        onCancel(); // Close the modal
    };

    return (
        <Modal
            className="modal"
            open={isOpen}
            okText={t("general.yes")}
            okType="primary"
            onOk={onConfirm}
            cancelText={t("general.no")}
            onCancel={handleCancel}
            centered
            closable
            keyboard
            maskClosable={false}
            title={
                <div className="modal__title">
                    <ExclamationCircleOutlined className="modal__title__delete-icon" />
                    {title}
                </div>
            }>
                {message}
        </Modal>
    );
};
export default DeleteConfirmModal;
