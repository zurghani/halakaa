import { Table, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTags } from "../../../../hooks/useTags";
import dayjs from "dayjs";
import { ClassWithTeacherInfo } from "../../../../types";

const ClassesTable = ({ classes }: { classes: ClassWithTeacherInfo[] }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { ageGroupTags } = useTags({});

    const columns: TableProps<ClassWithTeacherInfo>["columns"] = [
        {
            title: t("general.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("general.teacher"),
            dataIndex: "teacher",
            render: (teacher) => teacher?.name || "N/A",
            key: "teacherId",
            sorter: (a, b) => (a.teacher?.name > b.teacher?.name ? 1 : -1),
        },
        {
            title: t("general.ageGroup"),
            dataIndex: "ageGroup",
            key: "ageGroup",
            render: (ageGroup: string) => ageGroupTags[ageGroup] || ageGroup,
            filters: Object.keys(ageGroupTags).map((key) => ({
                text: ageGroupTags[key],
                value: key,
            })),
            onFilter: (value, record) => {
                return record.id == value;
            },
        },
        {
            title: t("general.startsAt"),
            dataIndex: "startsAt",
            key: "startsAt",
            render: (startsAt: string) => dayjs(startsAt, ["HH:mm:ss", "HH:mm"]).format("h:mm A"),

            sorter: (a, b) =>
                dayjs(a.startsAt, ["HH:mm:ss", "HH:mm"]).unix() -
                dayjs(b.startsAt, ["HH:mm:ss", "HH:mm"]).unix(),
        },
        {
            title: t("general.endsAt"),
            dataIndex: "endsAt",
            key: "endsAt",
            render: (endsAt: string) => dayjs(endsAt, ["HH:mm:ss", "HH:mm"]).format("h:mm A"),

            sorter: (a, b) =>
                dayjs(a.startsAt, ["HH:mm:ss", "HH:mm"]).unix() -
                dayjs(b.startsAt, ["HH:mm:ss", "HH:mm"]).unix(),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={classes.map((cls) => ({ ...cls, key: cls.id }))}
                onRow={(record: ClassWithTeacherInfo) => ({
                    onClick: () => {
                        // handle row click here
                        navigate(`/class/${record.id}`);
                    },
                })}
                pagination={false}
            />
        </>
    );
};

export default ClassesTable;
