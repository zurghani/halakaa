import React from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/PageLayout/PageLayout";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <PageLayout title={"hey"}>
        <div>
          <h3>Section 1</h3>
          <p>Content for section 1</p>
        </div>

        <div>
          <h3>Section 2</h3>
          <p>Content for section 2</p>
        </div>
      </PageLayout>
    </div>
  );
};

export default Home;
