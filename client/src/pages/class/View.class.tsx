import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CaretRightOutlined, PrinterOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { Paths } from "../../Routes";
import DownloadModal from "../../components/ExportModal/DownloadModal";
import ClassDetailsCard from "../../components/ClassDetailsCard/ClassDetailsCard";
import EnrolledStudents from "./EnrolledStudents/EnrolledStudents";
import { AppStore } from "../../store";
import { ActionButton } from "../../components/Button/ActionButton";

const ClassView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userRole = useSelector((state: AppStore) => state.user.role);

    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.viewClass")));
    }, [t]);
    const { setButtons } = useSetButtons();
    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />} />,
            <DownloadModal title={""} dataSelectorFunction={undefined} />,
            ...(userRole === "admin"
                ? [
                      <ActionButton key="edit" onClick={() => navigate(Paths.CLASS.EDIT)}>
                          {t("titles.editClass")}
                      </ActionButton>,
                      <ActionButton
                          key="enrollments"
                          onClick={() => navigate(Paths.CLASS.ENROLLMENTS)}>
                          {t("titles.editEnrollments")}
                      </ActionButton>,
                  ]
                : [
                      <ActionButton key="start" onClick={() => navigate(Paths.CLASS.RUNNING)}>
                          {t("titles.startClass")}
                      </ActionButton>,
                  ]),
        ]);
    }, []);

    return (
        <>
            <ClassDetailsCard />
            <br />
            <EnrolledStudents />
        </>
    );
};

export default ClassView;
