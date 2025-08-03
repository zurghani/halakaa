import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form, Modal } from "antd";
import { CaretLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { UserForm } from "./components/UserForm";
import { User } from "./types";
import { UserRole } from "../../store/types";

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const handleSubmit = (values: any) => {
        console.log("Editted:", values);
        // edit the user logic here
        setIsModalOpen(true);
    };

    const handleDone = () => {
        setIsModalOpen(false);
        navigate(Paths.USER.VIEW); //redirects to user list page
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
        <Modal
            open={isModalOpen}
            footer={[
            <Button key="done" type="primary" onClick={handleDone}>
            {t("modal.done")}
            </Button>
            ]}
            onCancel={handleDone} // to close modal with Esc key and navigate to user list
            centered
            closable={false}
            maskClosable={false}
            keyboard
            title={t("modal.user.updateSuccess")}
        >
            {t("modal.doneText")}
        </Modal>
        </>
    );

};
export default UserEditPage;
