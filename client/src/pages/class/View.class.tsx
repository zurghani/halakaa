import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CaretRightOutlined, PrinterOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { Paths } from "../../Routes";
import DownloadModal from "../../components/ExportModal/DownloadModal";
import ClassDetailsCard from "../../components/ClassDetailsCard/ClassDetailsCard";
import EnrolledStudents from "./EnrolledStudents/EnrolledStudents";

const ClassView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.viewClass")));
    }, [t]);
    const { setButtons } = useSetButtons();
    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />}></Button>,
            <DownloadModal title={""} dataSelectorFunction={undefined} />,
            <Button onClick={() => navigate(Paths.CLASS.RUNNING)} icon={<CaretRightOutlined />}>
                {t("titles.startClass")}
            </Button>,
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
