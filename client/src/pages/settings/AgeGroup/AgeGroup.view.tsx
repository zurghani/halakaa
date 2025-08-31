import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { Paths } from "../../../Routes";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import DownloadModal from "../../../components/ExportModal/DownloadModal";
import { ActionButton } from "../../../components/Button/ActionButton";
import AgeGroupTable from "./components/AgeGroupTable";
import { useAgeGroups } from "../../../queries/ageGroups";

const AgeGroupViewPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.ageGroups")));
    }, [t]);

    // Set Buttons
    useEffect(() => {
        setButtons([
            <DownloadModal title={""} dataSelectorFunction={undefined} />,
            <ActionButton key="edit" onClick={() => navigate(Paths.SETTINGS.ADMIN.AGEGROUP.EDIT)}>
                {t("general.edit")}
            </ActionButton>,
        ]);
    }, [t]);
    const { data: ageGroups, isLoading } = useAgeGroups();
    if (isLoading) return <div>Loading...</div>;
    return <AgeGroupTable data={ageGroups || []} editable={false} />;
};
export default AgeGroupViewPage;
