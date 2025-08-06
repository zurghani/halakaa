import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";


type Props = {
    isConfirmationModalOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    };

const TaskDeleteConfirmationModal: React.FC<Props> = ({ isConfirmationModalOpen, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    const handleCancel = () => {
        onCancel(); // Close the modal
    }

    return (
    <Modal
        open={isConfirmationModalOpen}
        okText={t("general.yes")}
        okType="primary"
        onOk={onConfirm}
        cancelText={t("general.no")}
        onCancel={handleCancel}
        centered
        closable
        keyboard
        maskClosable={false}
        title={t("editTaskModal.deleteTaskType")}
      >
        {t("editTaskModal.deleteConfirmation")}
      </Modal>
    );
};
export default TaskDeleteConfirmationModal;
