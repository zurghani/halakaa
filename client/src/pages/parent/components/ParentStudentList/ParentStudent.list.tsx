import { Button, Col, Empty, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../store";
import { useNavigate } from "react-router-dom";
import { Student } from "../../../../types";

const ParentStudentList = ({ students }: { students: Student[] }) => {
    const parent = useSelector((state: AppStore) => state.parent);
    const navigate = useNavigate();

    if (!parent.students?.length) {
        return <Empty />;
    }
    return (
        <Row gutter={[16, 8]} align="middle" justify="center">
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
                            onClick={() => navigate(`/student/${student.id}`)}
                            icon={<UserOutlined />}
                            variant="outlined"
                            style={{ width: "100%", height: "100px" }}>
                            {student.fullName}
                        </Button>
                    </Col>
                );
            })}
        </Row>
    );
};

export default ParentStudentList;
