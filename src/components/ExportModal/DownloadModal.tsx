import React, { useState } from "react";
import { Button, Modal, Segmented } from "antd";
import { Divider, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./DownloadModal.scss";

const { Title, Paragraph, Text, Link } = Typography;

const DownloadModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    //DOWNLOAD LOGIC GOES HERE
    console.log("Downloading...");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} icon={<DownloadOutlined />}>
        Open Download Modal
      </Button>
      <Modal
        className="modal"
        title="Download Reports for Student: Ahmed Mohamed"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={t("cancel")}
        okText={t("download")}
        okButtonProps={{ icon: <DownloadOutlined /> }}>
        <div className="modal__content">
          <div className="modal__content__timeFrameSelect">
            <Segmented options={[t("day"), t("week"), t("month"), t("all")]} />
          </div>
          <div className="modal__content__fileFormatText">
            <Text strong>Select Format</Text>
            <Text type="secondary"> • you will need excel to view CSV</Text>
          </div>
          <div className="modal__content__fileFormatSelect">
            <Segmented options={["PDF", "CSV"]} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DownloadModal;
