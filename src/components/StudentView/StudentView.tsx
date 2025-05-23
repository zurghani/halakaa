import { Button, Col, Empty, Row } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AppStore } from "../../store";

const StudentView: React.FC = () => {
  const teacher = useSelector((state: AppStore) => state.teacher);

  if (!teacher.students?.length) {
    return <Empty />;
  }
  return (
    <Row gutter={[16, 8]} align="middle" justify="center">
      {teacher.students.map((student, index) => {
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
