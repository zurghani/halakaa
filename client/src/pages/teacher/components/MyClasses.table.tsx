import { Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../hooks/useTags";
import { ClassWithTeacherInfo } from "../../../types";
import dayjs from "dayjs";

const MyClassesTable = ({ classes }: { classes: ClassWithTeacherInfo[] | undefined }) => {
    if (!classes) return <div>No classes available.</div>;

    const navigate = useNavigate();
    const { ageGroupTags } = useTags({});
    const { t } = useTranslation();
    const data = classes.map((teacherClass) => ({
        id: teacherClass.id,
        teacherId: teacherClass.teacher.id,
        ageGroup: teacherClass.ageGroup,
        start: dayjs(teacherClass.startsAt, "HH:mm").format("h:mm A"),
        end: dayjs(teacherClass.endsAt, "HH:mm").format("h:mm A"),
    }));

    const columns: TableProps["columns"] = [
        {
            title: t("class.classID"),
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: t("class.ageGroup"),
            dataIndex: "ageGroup",
            key: "ageGroup",
            render: (ageGroup) => ageGroupTags[ageGroup || 0],
            filters: Object.keys(ageGroupTags).map((key) => ({
                id: Number(key),
                text: ageGroupTags[key],
                value: key,
            })),
            onFilter: (value, record) => {
                return record.ageGroup == value;
            },
            sorter: (a, b) => (a.ageGroup > b.ageGroup ? 1 : -1),
        },
        {
            title: t("class.startsAt"),
            dataIndex: "start",
            key: "start",
            sorter: (a, b) => (a.start > b.start ? 1 : -1),
        },
        {
            title: t("class.endsAt"),
            dataIndex: "end",
            key: "end",
            sorter: (a, b) => (a.end > b.end ? 1 : -1),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(row) => `Row - ${row.id}`}
                onRow={(row) => ({
                    onClick: () => {
                        navigate(`/class/${row.id}`);
                    },
                })}
                pagination={false}
            />
        </>
    );
};

export default MyClassesTable;

// const timeToMinutes = (timeStr: string) => {
//     const [time, modifier] = timeStr.split(" ");
//     let [hours, minutes] = time.split(":").map(Number);

//     if (hours === 12) hours = 0;
//     if (modifier === "PM") hours += 12;

//     return hours * 60 + minutes;
// };
