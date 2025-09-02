import { useEffect, useState } from "react";
import { SearchOptionsType } from "./search.options";
import { DatePicker, Input, Segmented, Space } from "antd";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import { SearchData } from "./Find.student";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

type SearchFormProps = {
    SearchOptions: SearchOptionsType;
    SetData: React.Dispatch<React.SetStateAction<SearchData>>;
};

const SearchForm = ({ SearchOptions, SetData }: SearchFormProps) => {
    const [SearchType, setSearchType] = useState<keyof SearchOptionsType>(SearchOptions.id.value);
    useEffect(() => {
        console.log("Search Type Changed:", SearchType);
    }, [SearchType]);

    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        console.log(info?.source, value);
        console.log("Search Type:", SearchType);
        if (SearchType === "id") {
            SetData({ id: value, name: undefined, dob: undefined });
        } else if (SearchType === "name") {
            SetData({ name: value, id: undefined, dob: undefined });
        } else {
            SetData({}); // reset
        }
    };

    const onDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            SetData({ dob: date.format("YYYY-MM-DD"), id: undefined, name: undefined });
        } else {
            SetData({ dob: undefined, id: undefined, name: undefined });
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

            {SearchType === "dob" ? (
                <DatePicker style={{ width: "100%" }} onChange={onDateChange} />
            ) : (
                <Search
                    type={SearchType === "id" ? "number" : "text"}
                    addonBefore={SearchOptions[SearchType].label}
                    placeholder={`Enter ${SearchOptions[SearchType].label}`}
                    allowClear
                    onSearch={onSearch}
                    // style={{ width: 304 }}
                />
            )}
        </Space>
    );
};

export default SearchForm;
