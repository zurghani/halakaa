import { Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../hooks/useTags";
import { ClassWithAgeGroup } from "../../../types";

const MyClassesTable = ({ classes }: { classes: ClassWithAgeGroup[] }) => {
    const navigate = useNavigate();
    const { ageGroupTags } = useTags({});
    const { t } = useTranslation();
    const data = classes.map((teacherClass) => ({
        id: teacherClass.id,
        teacherId: teacherClass.teacherId,
        ageGroup: teacherClass.ageGroup,
        start: (() => {
            const date = new Date();
            date.setHours(
                parseInt(teacherClass?.startsAt?.split(" ")[0].split(":")[0] || "0"),
                parseInt(teacherClass?.startsAt?.split(" ")[0].split(":")[1] || "0")
            );
            return date.toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        })(),
        end: (() => {
            const date = new Date();
            date.setHours(
                parseInt(teacherClass?.endsAt?.split(" ")[0].split(":")[0] || "0"),
                parseInt(teacherClass?.endsAt?.split(" ")[0].split(":")[1] || "0")
            );
            return date.toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        })(),
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
            filters: classes.map((_class) => ({ text: _class.ageGroup, value: _class.ageGroup })),
            onFilter: (value, record) => record.ageGroup.indexOf(value as string) === 0,
            sorter: (a, b) => {
                const [aMin] = a.ageGroup.split(" - ").map(Number);
                const [bMin] = b.ageGroup.split(" - ").map(Number);
                return aMin - bMin;
            },
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
