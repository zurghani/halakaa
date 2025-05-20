import React from "react";
import { useTranslation } from "react-i18next";
import DownloadModal from "../../components/ExportModal/DownloadModal";
import AttendanceStatusTag from "../../components/StatusTag/AttendanceStatusTag";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <AttendanceStatusTag status="present" />
      <AttendanceStatusTag status="absent" />
      <AttendanceStatusTag status="late" />
    </div>
  );
};

export default Home;
