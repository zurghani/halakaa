import React, { useEffect, useState } from "react";
import { Button, Space, Grid } from "antd";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { SearchOptions } from "./search.options";
import SearchForm from "./SearchForm.class";
import { FindClassResultDummyData } from "./result/dummy.data";
import ClassesTable from "./result/Class.table";
import ClassList from "./result/Class.list";
import { useTranslation } from "react-i18next";
import { useClasses } from "../../../queries/classes";

const { useBreakpoint } = Grid;

export type SearchData = {
    classId?: number;
    teacherId?: string;
    teacherName?: string;
};

const FindClass: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.findClass")));
    }, [t]);
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const [count, setCount] = useState(0);

    const [searchData, setSearchData] = useState<SearchData>({});

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

    const filter = getFilter(searchData);

    const { data: classes, isLoading } = useClasses(filter);

    useEffect(() => {
        console.log("Search Data Changed:", searchData);
    }, [searchData]);
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <h2>{t("general.searchBy")}</h2>
            <SearchForm SearchOptions={SearchOptions} SetData={setSearchData} />
            {`${t("general.resultsFound")} ${FindClassResultDummyData.length}`}
            {isMobile ? (
                <ClassList classes={classes || []} />
            ) : (
                <ClassesTable classes={classes || []} />
            )}
        </Space>
    );
};

export default FindClass;

const getFilter = (data: SearchData) => {
    if (data.classId !== undefined) return { classId: data.classId };
    if (data.teacherId) return { teacherId: data.teacherId };
    if (data.teacherName) return { teacherName: data.teacherName };
    return {}; // fetch all
};
