import { Table, TableProps } from "antd";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTags } from "../../../../hooks/useTags";
import { Student } from "../../../../types";

const StudentTable = ({ students }: { students: Student[] }) => {

    const { ageGroupTags } = useTags({});
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
            key: "name",
            sorter: (a, b) => a.fullName.length - b.fullName.length,
        },
        {
            title: t("general.ageGroup"),
            dataIndex: "dateOfBirth",
            key: "ageGroup",
            render: (ageGroup: string) => ageGroupTags[ageGroup],
            filters: [
                { text: "5-10", value: "5-10" },
                { text: "11-15", value: "11-15" },
                { text: "16-20", value: "16-20" },
            ],
            onFilter: (value, record) =>
                record.dateOfBirth ? record.dateOfBirth.includes(value as string) : false,
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
