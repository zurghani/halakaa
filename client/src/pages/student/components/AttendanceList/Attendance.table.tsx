import { Table, TableProps } from "antd";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";
import { AttendanceStatus } from "../../../../store/types";
import { useTranslation } from "react-i18next";
import { Attendance } from "../../../../types";

// interface DataType {
//   key: string;
//   teacher: string;
//   type: TaskType;
//   from: string;
//   to: string;
//   date: string;
// }

const AttendanceTable = ({ attendance }: { attendance: Attendance[] }) => {
    const { t } = useTranslation();

    const columns: TableProps["columns"] = [
        {
            title: t("general.teacher"),
            dataIndex: "teacherId",
            key: "teacherId",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.teacherId - b.teacherId,
        },
        {
            title: t("general.date"),
            dataIndex: "date",
            key: "date",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.date - b.date,
        },
        {
            title: t("general.status"),
            dataIndex: "status",
            key: "status",
            render: (status) => <AttendanceStatusTag status={status} />,
            filters: [
                {
                    text: "Present",
                    value: AttendanceStatus.Present,
                },
                {
                    text: "Late",
                    value: AttendanceStatus.Late,
                },

                {
                    text: "Absent",
                    value: AttendanceStatus.Absent,
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={attendance} />
        </>
    );
};

export default AttendanceTable;
