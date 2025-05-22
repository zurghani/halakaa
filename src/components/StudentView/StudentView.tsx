import { Button, Col, Row } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

const StudentView: React.FC = () => {
  const students = [
    "Student A",
    "Student B",
    "Student C",
    "Student D",
    "Student E",
    "Student F",
    "Student G",
    "Student H",
  ];

  return (
    <Row gutter={[16, 8]} align="middle" justify="center">
      <Col span={24}>
        <h1>Welcome</h1>
      </Col>
      <Col span={24}>Pick a student to start</Col>
      {students.map((student, index) => {
        const key = `col-${index}`;
        return (
          <Col
            key={key}
            xs={{ flex: "100%" }}
            sm={{ flex: "100%" }}
            md={{ flex: "50%" }}
            lg={{ flex: "25%" }}
            xl={{ flex: "25%" }}>
            <Button
              icon={<UserOutlined />}
              color="default"
              variant="outlined"
              style={{ width: "100%", height: "100px" }}>
              {student}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

export default StudentView;
