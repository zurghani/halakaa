import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";

type Props = {
    confirmationModalOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    };

const TaskDeleteConfirmationModal: React.FC<Props> = ({ confirmationModalOpen, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    const handleCancel = () => {
        onCancel(); // Close the modal
    }

    return (
    <Modal
        open={confirmationModalOpen}
        footer={[
        <Button key="yes" type="primary" onClick={onConfirm}>
        {t("general.yes")}
        </Button>,
        <Button key="no" onClick={onCancel}>
        {t("general.no")}
        </Button>
        ]}
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
