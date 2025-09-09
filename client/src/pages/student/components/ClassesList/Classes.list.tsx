import { List, Tag } from "antd";
import dayjs from "dayjs";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ClassWithTeacherInfo } from "../../../../types";
import { useTags } from "../../../../hooks/useTags";

const ClassesList = ({ classes }: { classes: ClassWithTeacherInfo[] }) => {
    const { ageGroupTags } = useTags({});
    const classesWithAgeGroups = classes?.map((_class) => {
        return {
            ..._class,
            startsAt: dayjs(_class.startsAt, "HH:mm").format("h:mm A"),
            endsAt: dayjs(_class.endsAt, "HH:mm").format("h:mm A"),
            key: `class:${_class.id}`,
        };
    });

    return (
        <List
            itemLayout="horizontal"
            dataSource={classesWithAgeGroups}
            renderItem={(currentClass) => (
                <List.Item
                    onClick={() => console.log(`Class: ${currentClass.id}`)}
                    actions={[
                        <a key="view-class">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                <Tag>{currentClass.id}</Tag>
                                <Tag>{currentClass.teacher.name}</Tag>
                                {ageGroupTags[currentClass.ageGroup ?? ``]}
                                <br />
                                <Tag color="blue">{currentClass.startsAt}</Tag>
                                <Tag color="red">{currentClass.endsAt}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ClassesList;
