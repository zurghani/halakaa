import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { Paths } from "../../Routes";
import DownloadModal from "../../components/ExportModal/DownloadModal";
import ClassDetailsCard from "../../components/ClassDetailsCard/ClassDetailsCard";
import { ActionButton } from "../../components/Button/ActionButton";
import EnrollmentsTable from "./Enrollments/EnrollmentsTable";
import { authClient } from "../../lib/auth-client";
import { useEnrollments } from "../../queries/enrollments";
import { useClass } from "../../queries/classes";

const ClassView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { data: auth } = authClient.useSession();
    const { id } = useParams();
    const classId = id ?? "";

    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.viewClass")));
    }, [t]);
    const { setButtons } = useSetButtons();
    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />} />,
            <DownloadModal title={""} dataSelectorFunction={undefined} />,
            ...(auth?.user.role === "admin"
                ? [
                      <ActionButton
                          key="edit"
                          onClick={() => navigate(Paths.CLASS.EDIT.replace(":id", classId ?? ""))}>
                          {t("titles.editClass")}
                      </ActionButton>,
                      <ActionButton
                          key="enrollments"
                          onClick={() =>
                              navigate(Paths.CLASS.ENROLLMENTS.replace(":id", classId ?? ""))
                          }>
                          {t("titles.editEnrollments")}
                      </ActionButton>,
                  ]
                : [
                      <ActionButton key="start" onClick={() => navigate(Paths.CLASS.RUNNING)}>
                          {t("titles.startClass")}
                      </ActionButton>,
                  ]),
        ]);
    }, []);
    const { data: classData, isLoading: classLoading } = useClass(classId);
    const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments({
        classId: classId,
    });
    const classSize = enrollments?.length;
    if (enrollmentsLoading || classLoading) {
        return <div>Loading...</div>;
    }

    if (!classData) {
        return <div>No class data available</div>;
    }

    return (
        <>
            <ClassDetailsCard data={classData} classSize={classSize} />
            <br />
            <EnrollmentsTable enrollments={enrollments || []} />
        </>
    );
};

export default ClassView;
