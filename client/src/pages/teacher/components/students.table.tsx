import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table, TableProps } from "antd";
import { Student } from "../../../types";

// interface DataType {
//   key: string;
//   teacher: string;
//   type: TaskType;
//   from: string;
//   to: string;
//   date: string;
// }

const StudentsTable = ({ students }: { students: Student[] }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const columns: TableProps["columns"] = [
        {
            title: t("class.id"),
            dataIndex: "id",
            key: "id",

            defaultSortOrder: "descend",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: t("class.name"),
            dataIndex: "fullName",
            key: "fullName",
            filters: [
                {
                    text: "Sara",
                    value: "Sara",
                },
                {
                    text: "Fatima",
                    value: "Fatima",
                },
            ],
            onFilter: (value, record) => record.studentName.indexOf(value as string) === 0,
            defaultSortOrder: "descend",
            sorter: (a, b) => a.studentName - b.studentName,
        },
        {
            title: t("general.dob"),
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            sorter: (a, b) => (a.dateOfBirth > b.dateOfBirth ? 1 : -1),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={students ?? []}
                rowKey={(row) => `Row - ${row.id}`}
                onRow={(row) => ({
                    onClick: () => {
                        navigate(`/student/${row.id}`);
                    },
                })}
            />
        </>
    );
};

export default StudentsTable;
