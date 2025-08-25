import { useSelector } from "react-redux";
import { AppStore } from "../../../store";
import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../hooks/useTags";

const StudentsList: React.FC = () => {
    const { ageGroupTags } = useTags({});
    const navigate = useNavigate();
    const classes = useSelector((state: AppStore) => state.class[0]);
    const students = classes.students;
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
                                <Tag>{student.name}</Tag>
                                <Tag>{student.id}</Tag>
                                {ageGroupTags[classes.ageGroup || 0]}
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default StudentsList;
