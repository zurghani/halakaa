import { List, Tag } from "antd";

import { ArrowRightOutlined } from "@ant-design/icons";
import { useTags } from "../../../../hooks/useTags";
import { ClassWithTeacherInfo } from "../../../../types";
import { useAgeGroups } from "../../../../queries/ageGroups";
import dayjs from "dayjs";

const ClassesList = ({ classes }: { classes: ClassWithTeacherInfo[] }) => {
    const { ageGroupTags } = useTags({});
    const { data: ageGroups, isLoading: ageGroupsLoading } = useAgeGroups();
    const classesWithAgeGroups = classes?.map((_class) => {
        const ageGroupObj = ageGroups?.find((ag) => ag.id === _class.ageGroup);
        const ageGroup = ageGroupObj ? `${ageGroupObj.from} - ${ageGroupObj.to}` : "";
        return {
            ..._class,
            ageGroup: ageGroup,
            startsAt: dayjs(_class.startsAt, "HH:mm").format("h:mm A"),
            endsAt: dayjs(_class.endsAt, "HH:mm").format("h:mm A"),
            key: `class:${_class.id}`,
        };
    });
    if (ageGroupsLoading) return <div>Loading...</div>;

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
                                {ageGroupTags[currentClass.ageGroup] || currentClass.ageGroup}
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
