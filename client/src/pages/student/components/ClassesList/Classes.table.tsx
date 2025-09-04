import { Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { useTags } from "../../../../hooks/useTags";
import { ClassWithTeacherInfo } from "../../../../types";
import { useAgeGroups } from "../../../../queries/ageGroups";
import dayjs from "dayjs";

const ClassesTable = ({ classes }: { classes: ClassWithTeacherInfo[] }) => {
    const { ageGroupTags } = useTags({});
    const { t } = useTranslation();
    const { data: ageGroups, isLoading: ageGroupsLoading } = useAgeGroups();
    const classesWithAgeGroups = classes?.map((_class) => {
        const ageGroupObj = ageGroups?.find((ag) => ag.id === _class.ageGroup);
        const ageGroup = ageGroupObj ? `${ageGroupObj.from}-${ageGroupObj.to}` : "";
        return {
            ..._class,
            ageGroup: ageGroup,
            startsAt: dayjs(_class.startsAt, "HH:mm").format("h:mm A"),
            endsAt: dayjs(_class.endsAt, "HH:mm").format("h:mm A"),
            key: `class:${_class.id}`,
        };
    });
    const columns: TableProps["columns"] = [
        {
            title: t("class.classID"),
            dataIndex: "id",
            key: "id",

            sorter: (a, b) => a.id - b.id,
        },
        {
            title: t("class.teacher"),
            dataIndex: "teacher",
            key: "teacher",
            render: (teacher) => teacher.name,
            sorter: (a, b) => (a.teacher.name > b.teacherId.name ? 1 : -1),
        },
        {
            title: t("class.ageGroup"),
            dataIndex: "ageGroup",
            key: "ageGroup",
            render: (ageGroup) => ageGroupTags[ageGroup] || ageGroup,
            filters:
                ageGroups?.map((ag) => ({
                    text: `${ag.from}-${ag.to}`,
                    value: `${ag.from}-${ag.to}`,
                })) ?? [],
            onFilter: (value, record) => record.ageGroup.indexOf(value as string) === 0,
            sorter: (a, b) => {
                const [aMin] = a.ageGroup.split(" - ").map(Number);
                const [bMin] = b.ageGroup.split(" - ").map(Number);
                return aMin - bMin;
            },
        },
        {
            title: t("class.startsAt"),
            dataIndex: "startsAt",
            key: "startsAt",
            sorter: (a, b) => (a.startsAt > b.startsAt ? 1 : -1),
        },
        {
            title: t("class.endsAt"),
            dataIndex: "endsAt",
            key: "endsAt",
            sorter: (a, b) => a.endsAt.valueOf() - b.endsAt.valueOf(),
        },
    ];

    if (ageGroupsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Table columns={columns} dataSource={classesWithAgeGroups} pagination={false} />
        </>
    );
};

export default ClassesTable;

// const timeToMinutes = (timeStr: string) => {
//     const [time, modifier] = timeStr.split(" ");
//     let [hours, minutes] = time.split(":").map(Number);

//     if (hours === 12) hours = 0;
//     if (modifier === "PM") hours += 12;

//     return hours * 60 + minutes;
// };
