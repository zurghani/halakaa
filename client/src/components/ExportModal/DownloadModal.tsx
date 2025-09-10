import { useState } from "react";
import { Button, Modal, Segmented } from "antd";
import { Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./DownloadModal.scss";

const { Text } = Typography;

interface DownloadModalProps {
    title: string;
    data: any[]; //NOT SURE WHAT THE TYPE SHOULD BE
}

const DownloadModal = ({ title, data }: DownloadModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileFormat, setFileFormat] = useState<"PDF" | "CSV">("CSV");
    const { t } = useTranslation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        //DOWNLOAD LOGIC GOES HERE
        console.log("Downloading...");
        if (fileFormat === "CSV") {
            downloadCSV(data, "students_results.csv");
        } else {
            // You can handle PDF later
            console.log("PDF download not implemented yet");
        }
        setIsModalOpen(false);
    };

    const downloadCSV = (data: any[], filename: string) => {
        if (!data || data.length === 0) return;

        // Extract headers from object keys
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(","), // header row
            ...data.map((row) => headers.map((h) => `"${row[h] ?? ""}"`).join(",")),
        ];

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button onClick={showModal} icon={<DownloadOutlined />}></Button>
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
                    <div className="modal__content__time-frame-select">
                        <Segmented
                            options={[
                                t("modal.day"),
                                t("modal.week"),
                                t("modal.month"),
                                t("modal.all"),
                            ]}
                        />
                    </div>
                    <div className="modal__content__file-format-text">
                        <Text strong>{t("modal.selectFormat")}</Text>
                        <Text type="secondary"> • {t("modal.bodyText")}</Text>
                    </div>
                    <div className="modal__content__file-format-select">
                        <Segmented
                            options={["PDF", "CSV"]}
                            value={fileFormat}
                            onChange={(val) => setFileFormat(val as "PDF" | "CSV")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DownloadModal;
