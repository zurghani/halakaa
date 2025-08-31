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
import { useStudents } from "../../queries/students";
import { useEnrollments } from "../../queries/enrollments";
import { EnrollmentWithStudent } from "../../types";
import { useClass } from "../../queries/classes";

const ClassView: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { data: auth } = authClient.useSession();
    const { id } = useParams();
    const classId = id ?? undefined;

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
    const { data: classData, isLoading: classLoading } = useClass(classId ?? "");
    const { data: students, isLoading: studentsLoading } = useStudents({ classId: classId });
    const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments({
        classId: classId,
    });
    const classSize = enrollments?.length;
    const enrollmentsWithStudents: EnrollmentWithStudent[] | undefined = enrollments?.map(
        (enrollment) => ({
            ...enrollment,
            student: students?.find((student) => student.id === enrollment.studentId) ?? null,
        })
    );
    if (studentsLoading || enrollmentsLoading || classLoading) {
        return <div>Loading...</div>;
    }

    if (!classData) {
        return <div>No class data available</div>;
    }

    return (
        <>
            <ClassDetailsCard data={classData} classSize={classSize} />
            <br />
            <EnrollmentsTable enrollments={enrollmentsWithStudents || []} />
        </>
    );
};

export default ClassView;
