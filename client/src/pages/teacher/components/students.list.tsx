import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Student } from "../../../types";

const StudentsList = ({ students }: { students: Student[] }) => {
    const navigate = useNavigate();
    return (
        <List
            itemLayout="horizontal"
            dataSource={students}
            renderItem={(student) => (
                <List.Item
                    onClick={() => {
                        navigate(`/student/${student.id}`);
                    }}
                    actions={[
                        <a key="teacher-view-classes">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                <Tag>{student.id}</Tag>
                                <Tag>{student.fullName}</Tag>
                                <Tag color="blue">{student.dateOfBirth}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default StudentsList;
