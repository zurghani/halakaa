import { useEffect, useState } from "react";
import { SearchOptions, SearchOptionsType } from "./search.options";
import { Input, Segmented, Select, Space } from "antd";
import type { GetProps } from "antd";
import { SearchData } from "./Find.class";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Option } = Select;

type SearchFormProps = {
    searchType: keyof SearchOptionsType;
    setSearchType: React.Dispatch<React.SetStateAction<keyof SearchOptionsType>>;
    SetData: React.Dispatch<React.SetStateAction<SearchData>>;
};

const SearchForm = ({ searchType, setSearchType, SetData }: SearchFormProps) => {
    const [teacherSearchOption, setTeacherSearchOption] = useState<"name" | "id">("name");

    useEffect(() => {
        SetData({});
    }, [searchType, teacherSearchOption, SetData]);
    // useEffect(() => {
    //     console.log("Search Type Changed:", searchType);
    //     console.log("Teacher Search Option Changed:", teacherSearchOption);
    //     if (searchType === "all") {
    //         SetData({
    //             classId: undefined,
    //             teacherName: undefined,
    //         });
    //     } else {
    //         SetData({}); // reset when switching to teacher/id too
    //     }
    // }, [SearchType, teacherSearchOption, SetData]);

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
        if (searchType === "teacher") {
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
        } else if (searchType === "id") {
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
                value={searchType}
                options={Object.values(SearchOptions).map((option) => ({
                    label: option.label,
                    value: option.value,
                }))}
                onChange={(value) => {
                    setSearchType(value as keyof SearchOptionsType);
                }}
            />

            {searchType === "all" ? (
                <>All Classes</>
            ) : (
                <Search
                    type={searchType === "id" ? "number" : "text"}
                    addonBefore={
                        searchType === "teacher"
                            ? teacherSearchOptions
                            : SearchOptions[searchType].label
                    }
                    placeholder={`Enter ${SearchOptions[searchType].label} ${
                        searchType === "teacher"
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
