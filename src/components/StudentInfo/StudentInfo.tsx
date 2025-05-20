import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store";
import { Col, Progress, Row } from "antd";

import "./StudentInfo.scss";

const StudentStat = ({
  perventage,
  legend,
}: {
  perventage: number;
  legend: string;
}) => {
  return (
    <div className="student-section__stat">
      <Progress type="circle" percent={Number(perventage)} size={80} />
      <p>{legend}</p>
    </div>
  );
};
const StudentInfo: React.FC = () => {
  const student = useSelector((state: AppStore) => state.student);
  console.log(student);
  return (
    <>
      <Row gutter={[16, 8]} className="student-section__info">
        <Col span={4}>ID:</Col>
        <Col span={20}>{student.id}</Col>

        <Col span={4}>Name:</Col>
        <Col span={20}>{student.name}</Col>

        <Col span={4}>Age:</Col>
        <Col span={20}>{student.age}</Col>

        <Col span={4}>Joined:</Col>
        <Col span={20}>{student.joinDate}</Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col span={6}>
          <StudentStat
            perventage={student.stats.quranCompletion || 0}
            legend="Of the Quran"></StudentStat>
        </Col>
        <Col span={6}>
          <StudentStat
            perventage={student.stats.successRate || 0}
            legend="Success"></StudentStat>
        </Col>
        <Col span={6}>
          <StudentStat
            perventage={student.stats.attendance || 0}
            legend="Attendance"></StudentStat>
        </Col>
      </Row>
    </>
  );
};

export default StudentInfo;
