import { List, Tag } from "antd";
import { FindClassResultType } from "./dummy.data";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../../hooks/useTags";

const ClassList = ({ classes }: { classes: FindClassResultType[] }) => {
    const navigate = useNavigate();
    const { ageGroupTags } = useTags({});

    return (
        <List
            itemLayout="horizontal"
            dataSource={classes}
            renderItem={(currentClass) => (
                <List.Item
                    onClick={() => {
                        navigate(`/class/${currentClass.id}`);
                    }}
                    actions={[
                        <a key="view-class">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                <Tag> ID : {currentClass.id}</Tag>
                                Teacher: {currentClass.teacher}
                                <br />
                                {ageGroupTags[currentClass.ageGroup]}
                                <Tag>{currentClass.StartsAt}</Tag>
                                <Tag>{currentClass.EndsAt}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ClassList;
