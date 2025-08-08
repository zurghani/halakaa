import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

type TaskDeleteModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const TaskDeleteModal: React.FC<TaskDeleteModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    const handleCancel = () => {
        onCancel(); // Close the modal
    };

    return (
        <Modal
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
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <ExclamationCircleOutlined style={{ fontSize: 20, color: "red" }} />
                    {t("editTaskModal.deleteTaskType")}
                </div>
            }>
            {t("editTaskModal.deleteConfirmation")}
        </Modal>
    );
};
export default TaskDeleteModal;
