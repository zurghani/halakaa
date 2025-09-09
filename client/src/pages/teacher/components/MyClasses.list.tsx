import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../hooks/useTags";
import { Class, ClassWithTeacherInfo } from "../../../types";

const MyClassesList = ({ classes }: { classes: ClassWithTeacherInfo[] | undefined }) => {
    const navigate = useNavigate();
    const { ageGroupTags } = useTags({});

    if (!classes || classes.length === 0) {
        return <div>No classes available.</div>;
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={classes}
            renderItem={(classItem) => (
                <List.Item
                    onClick={() => {
                        navigate(`/class/${classItem.id}`);
                    }}
                    actions={[
                        <a key="teacher-view-classes">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                <Tag>{classItem.id}</Tag>
                                {ageGroupTags[classItem.ageGroup || 0]}
                                <Tag color="green">{classItem.startsAt}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default MyClassesList;
