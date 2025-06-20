import React, { useEffect } from "react";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { Button, Segmented, Input, Space, DatePicker } from "antd";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import { SearchOptions, SearchOptionsType } from "./search.options";
import StudentTable from "./result/Student.table";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
  console.log(info?.source, value);
};
const onDateChange = (date: dayjs.Dayjs, dateString: string | string[]) => {
  console.log("Date changed", date, dateString);
};

const FindStudent: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [SearchType, setSearchType] = React.useState<keyof SearchOptionsType>(
    SearchOptions.id.value
  );
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

  useEffect(() => {
    console.log("Search Type Changed:", SearchType);
  }, [SearchType]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <h2>Search By:</h2>
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
      <StudentTable />
    </Space>
  );
};

export default FindStudent;
