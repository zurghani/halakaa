import React from "react";
import { useTranslation } from "react-i18next";
import DownloadModal from "../../components/ExportModal/DownloadModal";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <DownloadModal
        title="Download Reports for Student: Ahmed Mohamed"
        dataSelectorFunction=""></DownloadModal>
    </div>
  );
};

export default Home;
