import React, { useEffect, useState } from "react";
import { Space, Grid, Button } from "antd";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import SearchForm from "./SearchForm.class";
import ClassesTable from "./result/Class.table";
import ClassList from "./result/Class.list";
import { useTranslation } from "react-i18next";
import { useSearchClasses } from "../../../queries/classes";
import { SearchOptions, SearchOptionsType } from "./search.options";
import DownloadModal from "../../../components/ExportModal/DownloadModal";
import { PrinterOutlined } from "@ant-design/icons";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";

const { useBreakpoint } = Grid;

export type SearchData = {
    classId?: number;
    teacherName?: string;
};

const FindClass: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { setButtons } = useSetButtons();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.findClass")));
    }, [t]);
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [searchType, setSearchType] = useState<keyof SearchOptionsType>(SearchOptions.all.value);
    const [searchData, setSearchData] = useState<SearchData>({});

    const filter = getFilter(searchData);

    const { data: classes } = useSearchClasses(searchType !== "all" ? filter : {});
    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />} />,
            <DownloadModal title={""} data={classes || []} />,
        ]);
    }, [classes]);

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <h2>{t("general.searchBy")}</h2>
            <SearchForm
                SetData={setSearchData}
                searchType={searchType}
                setSearchType={setSearchType}
            />
            {`${t("general.resultsFound")} ${classes?.length}`}
            {isMobile ? (
                <ClassList classes={classes ?? []} />
            ) : (
                <ClassesTable classes={classes ?? []} />
            )}
        </Space>
    );
};

export default FindClass;

const getFilter = (data: SearchData) => {
    if (data.classId !== undefined) return { classId: data.classId };
    if (data.teacherName) return { teacherName: data.teacherName };
    return {}; // fetch all
};
