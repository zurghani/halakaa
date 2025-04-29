import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setDirection } from "../../store/ui.slice";

const { Option } = Select;

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleChange = (lang: "ar" | "en") => {
    i18n.changeLanguage(lang); // Change language in i18next
    dispatch(setDirection(lang === "ar" ? "rtl" : "ltr"));
  };

  return (
    <Select
      value={i18n.language as "ar" | "en"}
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <Option value="en">English</Option>
      <Option value="ar">العربية</Option>
    </Select>
  );
};

export default LanguageSelect;
