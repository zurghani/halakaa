import { Button, Col, Empty, Row } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../store";

const ParentStudentList: React.FC = () => {
  const parent = useSelector((state: AppStore) => state.parent);

  if (!parent.students?.length) {
    return <Empty />;
  }
  return (
    <Row gutter={[16, 8]} align="middle" justify="center">
      {parent.students.map((student, index) => {
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
              variant="outlined"
              style={{ width: "100%", height: "100px" }}>
              {student.name}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

export default ParentStudentList;
