import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { CaretLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { UserForm } from "./components/UserForm";
import { User } from "./types";
import { UserRole } from "../../store/types";
import SaveSuccessModal from "../../components/Modals/Success";

const dummyUser: User = {
    id: "1",
    fullName: "Zacharea K",
    email: "zachrea@gmail.com",
    phone: "+1234567890",
    language: "en",
    role: UserRole.Parent,
    children: [
        { id: "1", fullName: "Child 1", ageGroup: "5-7" },
        { id: "2", fullName: "Child 2", ageGroup: "8-10" },
        { id: "3", fullName: "Child 3", ageGroup: "11-13" },
    ],
};

const UserEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleSubmit = (values: any) => {
        console.log("Editted:", values);
        // edit the user logic here
        setIsSuccessModalOpen(true);
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.editUser")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <Button onClick={() => form.submit()} icon={<CaretLeftOutlined />}>
                {t("general.save")}
            </Button>,
        ]);
    }, [t]);

    return (
        <>
            <UserForm form={form} defaultValues={dummyUser} onSubmit={handleSubmit} />
            <SaveSuccessModal 
                isOpen={isSuccessModalOpen} 
                onClose={() => setIsSuccessModalOpen(false)}
                navigatePath={Paths.USER.VIEW}
                title={t("modal.user.editSuccess")}
                message={t("modal.doneMessage")}
            />
        </>
    );
};
export default UserEditPage;
