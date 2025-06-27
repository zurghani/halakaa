import DownloadModal from "../../components/ExportModal/DownloadModal";
import { Button, Grid } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { useEffect } from "react";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useDispatch } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import StudentsTable from "./components/students.table";
import StudentsList from "./components/students.list";

const { useBreakpoint } = Grid;

const ViewStudents: React.FC = () => {
  const { setButtons } = useSetButtons();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle("Students assigned to you:"));
  }, []);

  useEffect(() => {
    setButtons([
      <Button icon={<PrinterOutlined />}></Button>,
      <DownloadModal title={""} dataSelectorFunction={undefined} />,
    ]);
  }, []);
  return isMobile ? <StudentsList /> : <StudentsTable />;
};

export default ViewStudents;
