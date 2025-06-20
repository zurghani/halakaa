import React, { use, useEffect, useState } from "react";
import { Button, Space, Grid } from "antd";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../store/ui.slice";

const { useBreakpoint } = Grid;

const FindClass: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle("Find Class"));
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
      {/* <SearchForm SearchOptions={SearchOptions} />
      {isMobile ? (
        <StudentList students={FindStudentResultDummyData} />
      ) : (
        <StudentTable students={FindStudentResultDummyData} />
      )} */}
    </Space>
  );
};

export default FindClass;
