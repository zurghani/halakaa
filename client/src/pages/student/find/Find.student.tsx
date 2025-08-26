import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Space, Grid } from "antd";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { SearchOptions } from "./search.options";
import { FindStudentResultDummyData } from "./result/dummy.data";
import StudentTable from "./result/Student.table";
import StudentList from "./result/Student.list";
import SearchForm from "./SearchForm.student";
import { useTranslation } from "react-i18next";
import { useStudents } from "../../../queries/students";

const { useBreakpoint } = Grid;

const FindStudent: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.findStudent")));
    }, [t]);
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const [count, setCount] = useState(0);

    const { setButtons } = useSetButtons();
    useEffect(() => {
        setButtons([
            <Button key="add" type="default" onClick={() => setCount(count + 1)}>
                +
            </Button>,
            <Button key="search" type="default" onClick={() => setCount(count - 1)}>
                -
            </Button>,
        ]);
    }, [count]);

    const { data, isLoading, error } = useStudents();
    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;
    console.log(data);

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <h2>{t("general.searchBy")}</h2>
            <SearchForm SearchOptions={SearchOptions} />
            {`${t("general.resultsFound")} ${FindStudentResultDummyData.length}`}
            {isMobile ? (
                <StudentList students={FindStudentResultDummyData} />
            ) : (
                <StudentTable students={FindStudentResultDummyData} />
            )}
        </Space>
    );
};

export default FindStudent;
