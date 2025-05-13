import React, { useState } from "react";
import { Button, Modal, Segmented } from "antd";
import { Divider, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./DownloadModal.scss";

const { Title, Paragraph, Text, Link } = Typography;

interface DownloadModalProps {
  title: string;
  dataSelectorFunction: any; //NOT SURE WHAT THE TYPE SHOULD BE
}

const DownloadModal = ({ title, dataSelectorFunction }: DownloadModalProps) => {
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
        title={t("modal.title") + title}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={t("modal.cancel")}
        okText={t("modal.download")}
        okButtonProps={{ icon: <DownloadOutlined /> }}>
        <div className="modal__content">
          <div className="modal__content__timeFrameSelect">
            <Segmented
              options={[
                t("modal.day"),
                t("modal.week"),
                t("modal.month"),
                t("modal.all"),
              ]}
            />
          </div>
          <div className="modal__content__fileFormatText">
            <Text strong>{t("modal.selectFormat")}</Text>
            <Text type="secondary"> • {t("modal.bodyText")}</Text>
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
