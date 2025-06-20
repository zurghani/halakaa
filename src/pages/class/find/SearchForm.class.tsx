import { useEffect, useState } from "react";
import { SearchOptionsType } from "./search.options";
import { Input, Segmented, Select, Space } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const { Option } = Select;

const SearchForm = ({
  SearchOptions,
}: {
  SearchOptions: SearchOptionsType;
}) => {
  const [SearchType, setSearchType] = useState<keyof SearchOptionsType>(
    SearchOptions.id.value
  );
  const [teacherSearchOption, setTeacherSearchOption] = useState<"name" | "id">(
    "name"
  );
  useEffect(() => {
    console.log("Search Type Changed:", SearchType);
    console.log("Teacher Search Option Changed:", teacherSearchOption);
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
