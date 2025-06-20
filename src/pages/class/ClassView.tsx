import React from "react";
import ClassDetailsCard from "../../components/ClassDetailsCard/ClassDetailsCard";
import EnrolledStudents from "../../components/ClassDetailsCard/EnrolledStudents";


const ClassView: React.FC = () => {

  return (
    <>
      <ClassDetailsCard />
      <br />
      <EnrolledStudents />
    </>
  );
};

export default ClassView;
