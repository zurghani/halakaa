import { useSelector } from "react-redux";
import { AppStore } from "../../../store";
import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../hooks/useTags";

const MyClassesList: React.FC = () => {
    const navigate = useNavigate();
    const { ageGroupTags } = useTags({});

    const classes = useSelector((state: AppStore) => state.class);

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
                                <Tag>{classItem.teacherId}</Tag>
                                {ageGroupTags[classItem.ageGroup || 0]}
                                <Tag color="green">{classItem.time.start}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default MyClassesList;
