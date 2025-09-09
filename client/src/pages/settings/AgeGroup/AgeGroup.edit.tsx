import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { Paths } from "../../../Routes";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { ActionButton } from "../../../components/Button/ActionButton";
import AgeGroupTable from "./components/AgeGroupTable";
import AgeGroupCreateModal from "./components/Modals/AgeGroupCreate";
import SaveSuccessModal from "../../../components/Modals/Success";
import DeleteConfirmModal from "../../../components/Modals/Delete";
import { useAgeGroups, useCreateAgeGroup, useDeleteAgeGroup } from "../../../queries/ageGroups";
import { AgeGroup, NewAgeGroup } from "../../../types";

const AgeGroupEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data: initialAgeGroups, isLoading } = useAgeGroups();
    const createAgeGroupMutation = useCreateAgeGroup();
    const deleteAgeGroupMutation = useDeleteAgeGroup();

    const [ageGroups, setAgeGroups] = useState<AgeGroup[]>(initialAgeGroups || []);
    const [toBeCreatedAgeGroupList, setToBeCreatedAgeGroupList] = useState<AgeGroup[]>([]);
    const [toBeDeletedAgeGroupList, setToBeDeletedAgeGroupList] = useState<number[]>([]);

    const [isAgeGroupCreateModalOpen, setIsAgeGroupCreateModalOpen] = useState(false);
    const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSave = () => {
        toBeCreatedAgeGroupList.forEach((ageGroup) => {
            createAgeGroupMutation.mutate({
                from: ageGroup.from,
                to: ageGroup.to,
                description: ageGroup.description,
            });
        });
        toBeDeletedAgeGroupList.forEach((id) => {
            deleteAgeGroupMutation.mutate(id.toString());
        });
        setIsSaveSuccessModalOpen(true);
        navigate(Paths.SETTINGS.ADMIN.AGEGROUP.VIEW);
    };

    const handleCreateAgeGroup = (newAgeGroup: NewAgeGroup) => {
        const ageGroupToBeAdded: AgeGroup = {
            id: Math.floor(Math.random() * -1000), // Temporary negative ID for frontend
            from: newAgeGroup.from,
            to: newAgeGroup.to,
            description: newAgeGroup.description || "",
        };
        setToBeCreatedAgeGroupList((prev) => [...prev, ageGroupToBeAdded]);
        setIsAgeGroupCreateModalOpen(false);
    };

    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            if (toBeCreatedAgeGroupList.find((ageGroup) => ageGroup.id === deleteId)) {
                setToBeCreatedAgeGroupList((prev) =>
                    prev.filter((ageGroup) => ageGroup.id !== deleteId)
                );
            } else {
                setToBeDeletedAgeGroupList((prev) => [...prev, deleteId]);
            }
            setAgeGroups((prev) => prev.filter((ageGroup) => ageGroup.id !== deleteId));
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
    }, [t, toBeCreatedAgeGroupList, toBeDeletedAgeGroupList]);
    useEffect(() => {
        if (!isLoading) {
            setAgeGroups(initialAgeGroups || []);
        }
    }, [initialAgeGroups, isLoading]);

    return (
        <>
            <AgeGroupTable
                data={[...(ageGroups || []), ...toBeCreatedAgeGroupList]}
                editable
                onDelete={handleDeleteRequest}
                onCreate={() => setIsAgeGroupCreateModalOpen(true)}
            />
            <SaveSuccessModal
                isOpen={isSaveSuccessModalOpen}
                onClose={() => setIsSaveSuccessModalOpen(false)}
                navigatePath={Paths.SETTINGS.ADMIN.AGEGROUP.VIEW}
                title={t("modal.ageGroup.createSuccess")}
                message={t("modal.doneMessage")}
            />
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title={t("modal.ageGroup.deleteTitle")}
                message={t("modal.ageGroup.deleteConfirmation")}
            />
            <AgeGroupCreateModal
                isOpen={isAgeGroupCreateModalOpen}
                onCreate={handleCreateAgeGroup}
                onCancel={() => setIsAgeGroupCreateModalOpen(false)}
            />
        </>
    );
};
export default AgeGroupEditPage;
