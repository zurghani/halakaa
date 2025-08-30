import DownloadModal from "../../components/ExportModal/DownloadModal";
import { Button, Grid } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { useEffect } from "react";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useDispatch } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import StudentsTable from "./components/students.table";
import StudentsList from "./components/students.list";
import { useTranslation } from "react-i18next";
import { useStudents } from "../../queries/students";
import { authClient } from "../../lib/auth-client";

const { useBreakpoint } = Grid;

const ViewStudents: React.FC = () => {
    const { t } = useTranslation();
    const { setButtons } = useSetButtons();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.myStudents")));
    }, [t]);

    const { data: auth } = authClient.useSession();

    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />}></Button>,
            <DownloadModal title={""} dataSelectorFunction={undefined} />,
        ]);
    }, []);
    const { data, isLoading } = useStudents({ teacherId: auth?.user.id });
    if (isLoading) return <div>Loading...</div>;
    return isMobile ? (
        <StudentsList students={data ?? []} />
    ) : (
        <StudentsTable students={data ?? []} />
    );
};

export default ViewStudents;
