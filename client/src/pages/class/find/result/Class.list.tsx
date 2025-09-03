import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../../hooks/useTags";
import dayjs from "dayjs";
import { ClassWithTeacherInfo } from "../../../../types";

const ClassList = ({ classes }: { classes: ClassWithTeacherInfo[] }) => {
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
                                Teacher: {currentClass.teacher?.name || "N/A"}
                                <br />
                                {/* use age group tags when created  */}
                                {currentClass.ageGroup}
                                <Tag color="green">
                                    {dayjs(currentClass.startsAt, ["HH:mm:ss", "HH:mm"]).format(
                                        "h:mm A"
                                    )}
                                </Tag>
                                <Tag color="red">
                                    {dayjs(currentClass.endsAt, ["HH:mm:ss", "HH:mm"]).format(
                                        "h:mm A"
                                    )}
                                </Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ClassList;
