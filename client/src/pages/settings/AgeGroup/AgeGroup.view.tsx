import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { Paths } from "../../../Routes";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { AgeGroup } from "../types";
import DownloadModal from "../../../components/ExportModal/DownloadModal";
import { ActionButton } from "../../../components/Button/ActionButton";
import AgeGroupTable from "./components/AgeGroupTable";

const ageGroups: AgeGroup[] = [
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
    return <AgeGroupTable data={ageGroups} editable={false} />;
};
export default AgeGroupViewPage;
