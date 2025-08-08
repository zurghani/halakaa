import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { Paths } from "../../../../Routes";
import { CheckCircleOutlined } from "@ant-design/icons";

type ClassEditSuccessModalProps = {
    isSuccessModalOpen: boolean;
    onClose: () => void;
    };

const ClassEditSuccessModal: React.FC<ClassEditSuccessModalProps> = ({ isSuccessModalOpen, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleDone = () => {
        onClose(); // Close the modal
        navigate(Paths.CLASS.FIND); //redirects to classes list page
    };

    return (
    <Modal
        open={isSuccessModalOpen}
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
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircleOutlined style={{ fontSize: 20, color: 'lightgreen' }} />
            {t("modal.class.updateSuccess")} 
          </div>
        }>
        {t("modal.doneText")}
      </Modal>
    );
};
export default ClassEditSuccessModal;