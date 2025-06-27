import { Button, Grid } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { useEffect } from "react";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useDispatch } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import MyClassesList from "./components/MyClasses.list";
import MyClassesTable from "./components/MyClasses.table";
import DownloadModal from "../../components/ExportModal/DownloadModal";

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
  return isMobile ? <MyClassesList /> : <MyClassesTable />;
};

export default ViewClasses;
