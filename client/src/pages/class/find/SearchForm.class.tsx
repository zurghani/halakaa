import { useEffect, useState } from "react";
import { SearchOptionsType } from "./search.options";
import { Input, Segmented, Select, Space } from "antd";
import type { GetProps } from "antd";
import { SearchData } from "./Find.class";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Option } = Select;

type SearchFormProps = {
    SearchOptions: SearchOptionsType;
    SetData: React.Dispatch<React.SetStateAction<SearchData>>;
};

const SearchForm = ({ SearchOptions, SetData }: SearchFormProps) => {
    const [SearchType, setSearchType] = useState<keyof SearchOptionsType>(SearchOptions.id.value);
    const [teacherSearchOption, setTeacherSearchOption] = useState<"name" | "id">("name");
    useEffect(() => {
        console.log("Search Type Changed:", SearchType);
        console.log("Teacher Search Option Changed:", teacherSearchOption);
        if (SearchType === "all") {
            SetData({});
        } else {
            SetData({}); // reset when switching to teacher/id too
        }
    }, [SearchType, teacherSearchOption]);

    const teacherSearchOptions = (
        <Select
            defaultValue="name"
            onChange={(value) => {
                setTeacherSearchOption(value as "name" | "id");
            }}>
            <Option value="name">Name</Option>
            <Option value="id">ID</Option>
        </Select>
    );

    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        console.log(info?.source, value);
        console.log("Search Type:", SearchType);
        console.log("Teacher Search Option:", teacherSearchOption);
        if (SearchType === "teacher") {
            if (teacherSearchOption === "name") {
                SetData((prev) => ({
                    teacherName: value,
                    teacherId: undefined,
                    classId: undefined,
                }));
            } else {
                SetData((prev) => ({
                    teacherId: value,
                    teacherName: undefined,
                    classId: undefined,
                }));
            }
        } else if (SearchType === "id") {
            const classId = parseInt(value);
            if (!isNaN(classId)) {
                SetData((prev) => ({
                    classId: parseInt(value),
                    teacherId: undefined,
                    teacherName: undefined,
                }));
            }
        } else {
            SetData((prev) => ({
                classId: undefined,
                teacherId: undefined,
                teacherName: undefined,
            })); // For "all", clear all filters
        }
    };
    return (
        <Space direction="vertical" style={{ width: "100%", marginBottom: "24px" }}>
            <Segmented<string>
                value={SearchType}
                options={Object.values(SearchOptions).map((option) => ({
                    label: option.label,
                    value: option.value,
                }))}
                onChange={(value) => {
                    setSearchType(value as keyof SearchOptionsType);
                }}
            />

            {SearchType === "all" ? (
                <>All Classes</>
            ) : (
                <Search
                    type={SearchType === "id" ? "number" : "text"}
                    addonBefore={
                        SearchType === "teacher"
                            ? teacherSearchOptions
                            : SearchOptions[SearchType].label
                    }
                    placeholder={`Enter ${SearchOptions[SearchType].label} ${
                        SearchType === "teacher"
                            ? teacherSearchOption === "name"
                                ? "Name"
                                : "ID"
                            : ""
                    }`}
                    allowClear
                    onSearch={onSearch}
                    // style={{ width: 304 }}
                />
            )}
        </Space>
    );
};

export default SearchForm;
