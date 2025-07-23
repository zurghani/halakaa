import React, { useEffect } from "react";
import ClassDetailsCard from "../../components/ClassDetailsCard/ClassDetailsCard";
import EnrolledStudents from "./EnrolledStudents/EnrolledStudents";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useTranslation } from "react-i18next";
import { CaretRightOutlined, PrinterOutlined } from "@ant-design/icons";
import DownloadModal from "../../components/ExportModal/DownloadModal";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../Routes";

const ClassView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.viewClass")));
    }, [t]);
    const [count, setCount] = React.useState(0);
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
