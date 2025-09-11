import { Table, TableProps } from "antd";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Student } from "../../../../types";

const StudentTable = ({ students }: { students: Student[] }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const columns: TableProps<Student>["columns"] = [
        {
            title: t("general.id"),
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => (a.id > b.id ? 1 : -1),
        },
        {
            title: t("general.name"),
            dataIndex: "fullName",
            key: "fullName",
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: t("general.dob"),
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (record: string) => <Tag color="blue">{record}</Tag>,
            sorter: (a, b) =>
                a.dateOfBirth && b.dateOfBirth ? (a.dateOfBirth > b.dateOfBirth ? 1 : 0) : 0,
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={students.map((student) => ({ ...student, key: student.id }))}
                onRow={(record: Student) => ({
                    onClick: () => {
                        // handle row click here
                        navigate(`/student/${record.id}`);
                    },
                })}
                pagination={false}
            />
        </>
    );
};

export default StudentTable;
