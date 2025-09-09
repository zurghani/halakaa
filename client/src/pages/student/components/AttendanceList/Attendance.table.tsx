import { Table, TableProps } from "antd";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";
import { AttendanceStatus, AttendanceWithTeacher } from "../../../../types";
import { useTranslation } from "react-i18next";

const AttendanceTable = ({ attendance }: { attendance: AttendanceWithTeacher[] }) => {
    const { t } = useTranslation();

    const columns: TableProps["columns"] = [
        {
            title: t("general.teacher"),
            dataIndex: "teacher",
            key: "teacher",
            defaultSortOrder: "descend",
            render: (teacher) => teacher.name,
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
            <Table
                columns={columns}
                dataSource={attendance.map((item) => ({ ...item, key: item.id }))}
                pagination={false}
            />
        </>
    );
};

export default AttendanceTable;
