import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { ButtonProps } from "antd/lib/button";
import { useTranslation } from "react-i18next";

interface ActionButtonProps extends ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}
export const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick, ...rest }) => {
    const { i18n } = useTranslation();

    return (
        <Button
            onClick={onClick}
            icon={i18n.dir() == "ltr" ? <CaretRightOutlined /> : <CaretLeftOutlined />}
            {...rest}>
            {children}
        </Button>
    );
};
