import { useDispatch, useSelector } from "react-redux";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { toggleDarkMode } from "../../store/ui.slice";
import { AppStore } from "../../store";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: AppStore) => state.ui.isDarkMode);
  return (
    <Button
      type="dashed"
      style={{ margin: "0px 5px" }}
      onClick={() => dispatch(toggleDarkMode())}
      icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}></Button>
  );
};
export default DarkModeToggle;
