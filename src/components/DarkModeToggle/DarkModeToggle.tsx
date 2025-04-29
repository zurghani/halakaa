import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/ui.slice";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { AppStore } from "../../store";
const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: AppStore) => state.ui.isDarkMode);
  return (
    <Button
      type="dashed"
      style={{ margin: "0px 5px" }}
      onClick={() => dispatch(toggleDarkMode())}
      icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
    ></Button>
  );
};
export default DarkModeToggle;
