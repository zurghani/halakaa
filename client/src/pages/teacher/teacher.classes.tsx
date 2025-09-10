import { Button, Grid } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { useEffect } from "react";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useDispatch } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import MyClassesList from "./components/MyClasses.list";
import MyClassesTable from "./components/MyClasses.table";
import DownloadModal, { flatten } from "../../components/ExportModal/DownloadModal";
import { useTranslation } from "react-i18next";
import { useClasses } from "../../queries/classes";

const { useBreakpoint } = Grid;

const ViewClasses: React.FC = () => {
    const { t } = useTranslation();
    const { setButtons } = useSetButtons();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.myClasses")));
    }, [t]);

    const { data: classes, isLoading: classesLoading } = useClasses({
        teacherId: "5add4a19-648a-48f9-b9df-6fb00b10e7a7", //TODO: GET TEACHER ID FROM LOGGED IN USER
    });
    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />}></Button>,
            <DownloadModal title={""} data={flatten(classes || [], "My Classes") || []} />,
        ]);
    }, [classes]);

    if (classesLoading) return <div>Loading...</div>;

    return isMobile ? <MyClassesList classes={classes} /> : <MyClassesTable classes={classes} />;
};

export default ViewClasses;
