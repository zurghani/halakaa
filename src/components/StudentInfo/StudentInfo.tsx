import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store";

const StudentInfo: React.FC = () => {
  const student = useSelector((state: AppStore) => state.student);
  console.log(student);
  return (
    <>
      <h1>Student Info</h1>
    </>
  );
};

export default StudentInfo;
