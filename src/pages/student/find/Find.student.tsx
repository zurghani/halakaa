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

const { useBreakpoint } = Grid;

const FindStudent: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle("View Student"));
  }, []);
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

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <h2>Search By:</h2>
      <SearchForm SearchOptions={SearchOptions} />
      {`${FindStudentResultDummyData.length} results found:`}
      {isMobile ? (
        <StudentList students={FindStudentResultDummyData} />
      ) : (
        <StudentTable students={FindStudentResultDummyData} />
      )}
    </Space>
  );
};

export default FindStudent;
