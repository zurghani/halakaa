import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { Paths } from "../../../Routes";

type Props = {
    isSaveModalOpen: boolean;
    onClose: () => void;
    };

const TaskConfirmModal: React.FC<Props> = ({ isSaveModalOpen, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleDone = () => {
        onClose(); // Close the modal
        navigate(Paths.SETTINGS.ADMIN.TASKTYPES.VIEW); //redirects to tasks list page
    };

    return (
    <Modal
        open={isSaveModalOpen}
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
        title={t("editTaskModal.confirmModal")}
      >
        {t("modal.doneText")}
      </Modal>
    );
};
export default TaskConfirmModal;