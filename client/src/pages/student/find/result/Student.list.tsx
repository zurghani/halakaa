import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Student } from "../../../../types";

const StudentList = ({ students }: { students: Student[] }) => {
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
                        <a key="view-student">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                {student.fullName}
                                <Tag> ID : {student.id}</Tag>
                                <Tag color="green"> Date of Birth: {student.dateOfBirth}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default StudentList;
