import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { Paths } from "../../../Routes";

type Props = {
    isModalOpen: boolean;
    onClose: () => void;
    };

const UserCreateModal: React.FC<Props> = ({ isModalOpen, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleDone = () => {
        onClose(); // Close the modal
        navigate(Paths.USER.VIEW); //redirects to user list page
    };

    return (
    <Modal
        open={isModalOpen}
        footer={[
        <Button key="done" type="primary" onClick={handleDone}>
        {t("modal.done")}
        </Button>
        ]}
        onCancel={handleDone} // to close modal with Esc key and navigate to user list
        centered
        closable={false}
        maskClosable={false}
        keyboard
        title={t("modal.user.createSuccess")}
      >
        {t("modal.doneText")}
      </Modal>
    );
};
export default UserCreateModal;