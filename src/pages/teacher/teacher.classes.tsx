import DownloadModal from "../../components/ExportModal/DownloadModal";
import { Button, Grid } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { useEffect } from "react";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useDispatch } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import ClassesList from "./components/classes.list";
import ClassesTable from "./components/classes.table";

const { useBreakpoint } = Grid;

const ViewClasses: React.FC = () => {
  const { setButtons } = useSetButtons();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle("Classes assigned to you:"));
  }, []);

  useEffect(() => {
    setButtons([
      <Button icon={<PrinterOutlined />}></Button>,
      <DownloadModal title={""} dataSelectorFunction={undefined} />,
    ]);
  }, []);
  return isMobile ? <ClassesList /> : <ClassesTable />;
};

export default ViewClasses;
