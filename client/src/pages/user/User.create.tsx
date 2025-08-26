import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Paths } from "../../Routes";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { UserForm } from "./components/UserForm";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { ActionButton } from "../../components/Button/ActionButton";
import SaveSuccessModal from "../../components/Modals/Success";

const UserCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleSubmit = (values: any) => {
        console.log("Submitted:", values);
        // Create user here
        setIsSuccessModalOpen(true);
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.createUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton onClick={() => form.submit()}>{t("general.create")}</ActionButton>,
        ]);
    }, [t]);

    return (
        <>
            <UserForm form={form} onSubmit={handleSubmit} />
            <SaveSuccessModal 
                isOpen={isSuccessModalOpen} 
                onClose={() => setIsSuccessModalOpen(false)}
                navigatePath={Paths.USER.VIEW}
                title={t("modal.user.createSuccess")}
                message={t("modal.doneMessage")}
            />
        </>
    );
};
export default UserCreatePage;
