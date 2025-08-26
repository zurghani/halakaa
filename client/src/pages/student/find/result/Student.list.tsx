import { List, Tag } from "antd";
import { FindStudentResultType } from "./dummy.data";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../../hooks/useTags";

const StudentList = ({ students }: { students: FindStudentResultType[] }) => {
    const { ageGroupTags } = useTags({});
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
                                {student.name}
                                <Tag> ID : {student.id}</Tag>
                                {ageGroupTags[student.ageGroup]}
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default StudentList;
