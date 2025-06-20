import { useEffect, useState } from "react";
import { SearchOptionsType } from "./search.options";
import { DatePicker, Input, Segmented } from "antd";
import type { GetProps } from "antd";
import dayjs from "dayjs";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
  console.log(info?.source, value);
};
const onDateChange = (date: dayjs.Dayjs, dateString: string | string[]) => {
  console.log("Date changed", date, dateString);
};

const SearchForm = ({
  SearchOptions,
}: {
  SearchOptions: SearchOptionsType;
}) => {
  const [SearchType, setSearchType] = useState<keyof SearchOptionsType>(
    SearchOptions.id.value
  );
  useEffect(() => {
    console.log("Search Type Changed:", SearchType);
  }, [SearchType]);
  return (
    <>
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
    </>
  );
};

export default SearchForm;
