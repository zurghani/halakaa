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
        },
        {
            title: t("general.name"),
            dataIndex: "fullName",
            key: "fullName",
            sorter: (a, b) => a.fullName.length - b.fullName.length,
        },
        {
            title: t("general.ageGroup"),
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (record: string) => <Tag color="blue">{record}</Tag>,
            sorter: (a, b) =>
                a.dateOfBirth && b.dateOfBirth ? a.dateOfBirth.localeCompare(b.dateOfBirth) : 0,
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={students}
                onRow={(record: Student) => ({
                    onClick: () => {
                        // handle row click here
                        navigate(`/student/${record.id}`);
                    },
                })}
            />
        </>
    );
};

export default StudentTable;
