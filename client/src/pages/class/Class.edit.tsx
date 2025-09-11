import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { ClassForm } from "./components/ClassForm";
import { ActionButton } from "../../components/Button/ActionButton";
import SaveSuccessModal from "../../components/Modals/Success";
import { useClass, useUpdateClass } from "../../queries/classes";
import { ClassFormValues } from "../../types";
import dayjs from "dayjs";

const ClassEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { id: classId } = useParams<{ id: string }>();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
    const updateClassMutation = useUpdateClass();

    const handleSubmit = (values: ClassFormValues) => {
        const _class = {
            classId: classId || "",
            updates: {
                description: values.description,
                startsAt: values.startsAt ? values.startsAt.format("HH:mm:ss") : null,
                endsAt: values.endsAt ? values.endsAt.format("HH:mm:ss") : null,
                ageGroup: values.ageGroup,
                teacherId: values.teacherId,
            },
        };
        updateClassMutation.mutate(_class, {
            onSuccess: () => {
                setIsSuccessModalOpen(true);
            },
        });
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.editClass")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.CLASS.FIND)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton onClick={() => form.submit()}>{t("general.save")}</ActionButton>,
        ]);
    }, [t]);
    const { data: initialClass, isLoading } = useClass(classId || "");

    const formInitialValues = initialClass
        ? {
              ...initialClass,
              startsAt: initialClass.startsAt ? dayjs(initialClass.startsAt, "HH:mm:ss") : null,
              endsAt: initialClass.endsAt ? dayjs(initialClass.endsAt, "HH:mm:ss") : null,
          }
        : undefined;
    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <ClassForm form={form} defaultValues={formInitialValues} onSubmit={handleSubmit} />
            <SaveSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                navigatePath={Paths.CLASS.FIND}
                title={t("modal.class.updateSuccess")}
                message={t("modal.doneMessage")}
            />
        </>
    );
};
export default ClassEditPage;
