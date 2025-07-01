import React, { useEffect } from "react";
import ClassDetailsCard from "../../components/ClassDetailsCard/ClassDetailsCard";
import EnrolledStudents from "./EnrolledStudents/EnrolledStudents";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useTranslation } from "react-i18next";

const ClassView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle(t("titles.viewClass")));
  }, [t]);
  const [count, setCount] = React.useState(0);
  const { setButtons } = useSetButtons();
  useEffect(() => {
    setButtons([
      <Button key="add" type="default" onClick={() => setCount(count + 1)}>
        +
      </Button>,
      <Button key="search" type="default" onClick={() => setCount(count - 1)}>
        -
      </Button>,
    ]);
  }, [count]);
  return (
    <>
      <ClassDetailsCard />
      <br />
      <EnrolledStudents />
    </>
  );
};

export default ClassView;
