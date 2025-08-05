import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { Paths } from "../../../Routes";

type Props = {
    isModalOpen: boolean;
    onClose: () => void;
    };

const StudentEditModal: React.FC<Props> = ({ isModalOpen, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleDone = () => {
        onClose(); // Close the modal
        navigate(Paths.STUDENT.FIND); //redirects to student list page
    };

    return (
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
    );
};
export default StudentEditModal;