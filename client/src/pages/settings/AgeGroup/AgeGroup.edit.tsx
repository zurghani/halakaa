import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { Paths } from "../../../Routes";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { AgeGroup } from "../types";
import { ActionButton } from "../../../components/Button/ActionButton";
import AgeGroupTable from "./components/AgeGroupTable";
import AgeGroupCreateModal from "./components/Modals/AgeGroupCreate";
import SaveSuccessModal from "../../../components/Modals/Success";
import DeleteConfirmModal from "../../../components/Modals/Delete";

const initialAgeGroups: AgeGroup[] = [
    {
        id: 1,
        from: 4,
        to: 6,
        description: "Pre-kindergarten and kindergarten",
    },
    {
        id: 2,
        from: 6,
        to: 8,
        description: "Early primary school",
    },
    {
        id: 3,
        from: 8,
        to: 12,
        description: "Late primary school",
    },
    {
        id: 4,
        from: 12,
        to: 14,
        description: "Early secondary school",
    },
    {
        id: 5,
        from: 14,
        to: 16,
        description: "Mid secondary school",
    },
];
const AgeGroupEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [ageGroups, setAgeGroups] = useState<AgeGroup[]>(initialAgeGroups);
    const [isAgeGroupCreateModalOpen, setIsAgeGroupCreateModalOpen] = useState(false);
    const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSave = () => {
        console.log("Saving age groups:", ageGroups);
        // TODO: Replace with API call
        setIsSaveSuccessModalOpen(true);
    };

    const handleCreateAgeGroup = (newAgeGroup: AgeGroup) => {
        setAgeGroups((prev) => [...prev, newAgeGroup]);
        setIsAgeGroupCreateModalOpen(false);
    };

    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            setAgeGroups((prev) => prev.filter((group) => group.id !== deleteId));
        }
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.editAgeGroups")));
    }, [t]);

    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button key="cancel" onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton key="save" onClick={handleSave}>
                {t("general.save")}
            </ActionButton>,
        ]);
    }, [t, ageGroups]);
    return (
        <>
        <AgeGroupTable
            data={ageGroups}
            editable
            onDelete={handleDeleteRequest}
            onCreate={() => setIsAgeGroupCreateModalOpen(true)}
            />
        <AgeGroupCreateModal
            isOpen={isAgeGroupCreateModalOpen}
            onCreate={handleCreateAgeGroup}
            onCancel={() => setIsAgeGroupCreateModalOpen(false)}
            />
        <SaveSuccessModal
            isOpen={isSaveSuccessModalOpen}
            onClose={() => setIsSaveSuccessModalOpen(false)}
            navigatePath={Paths.SETTINGS.ADMIN.AGEGROUP.VIEW}
            />
        <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            title={t("editModal.deleteConfirmation")}
            message={t("editModal.deleteConfirmation")}
            />
        </>
    );
};
export default AgeGroupEditPage;
