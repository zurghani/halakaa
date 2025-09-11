import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Space, Grid, Button } from "antd";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { SearchOptions } from "./search.options";
import StudentTable from "./result/Student.table";
import StudentList from "./result/Student.list";
import SearchForm from "./SearchForm.student";
import { useTranslation } from "react-i18next";
import { useSearchStudents } from "../../../queries/students";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import DownloadModal, { flatten } from "../../../components/ExportModal/DownloadModal";
import { PrinterOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

export type SearchData = {
    id?: string;
    name?: string;
    dob?: string;
};

const FindStudent: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { setButtons } = useSetButtons();
    const [exportData, setExportData] = useState<any[]>([]);

    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.findStudent")));
    }, [t]);
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [searchData, setSearchData] = useState<SearchData>({});
    const filter = getFilter(searchData);

    const { data: students, isLoading } = useSearchStudents(filter);

    useEffect(() => {
        if (students && students.length > 0) {
            setExportData(flatten(students, "Students Searched:"));
        } else {
            setExportData([]);
        }
    }, [students]);

    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />} />,
            <DownloadModal
                file_name={`students_filtered_by_${Object.values(filter).map((v) => (v ? v : ""))}`}
                data={exportData || []}
            />,
        ]);
    }, [students, exportData, searchData]);

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <h2>{t("general.searchBy")}</h2>
            <SearchForm SearchOptions={SearchOptions} SetData={setSearchData} />
            {`${t("general.resultsFound")} ${students?.length}`}
            {isMobile ? (
                <StudentList students={students ?? []} />
            ) : (
                <StudentTable students={students ?? []} />
            )}
        </Space>
    );
};

export default FindStudent;

const getFilter = (data: SearchData) => {
    if (data.id !== undefined) return { id: data.id };
    if (data.name) return { name: data.name };
    if (data.dob) return { dob: data.dob };
    return {}; // fetch all
};
