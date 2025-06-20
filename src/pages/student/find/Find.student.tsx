import React, { useEffect, useState } from "react";
import { Button, Space, Grid } from "antd";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { SearchOptions } from "./search.options";
import { FindStudentResultDummyData } from "./result/dummy.data";
import StudentTable from "./result/Student.table";
import StudentList from "./result/Student.list";
import SearchForm from "./SearchForm.student";

const { useBreakpoint } = Grid;

const FindStudent: React.FC = () => {
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
      {isMobile ? (
        <StudentList students={FindStudentResultDummyData} />
      ) : (
        <StudentTable students={FindStudentResultDummyData} />
      )}
    </Space>
  );
};

export default FindStudent;
