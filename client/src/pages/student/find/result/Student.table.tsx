import { Table, TableProps } from "antd";
import { FindStudentResultType } from "./dummy.data";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTags } from "../../../../hooks/useTags";

const StudentTable = ({ students }: { students: FindStudentResultType[] }) => {
    const { ageGroupTags } = useTags({});

    const { t } = useTranslation();
    const navigate = useNavigate();

    const columns: TableProps<FindStudentResultType>["columns"] = [
        {
            title: t("general.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("general.name"),
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: t("general.ageGroup"),
            dataIndex: "ageGroup",
            key: "ageGroup",
            render: (ageGroup: string) => ageGroupTags[ageGroup],
            filters: [
                { text: "5-10", value: "5-10" },
                { text: "11-15", value: "11-15" },
                { text: "16-20", value: "16-20" },
            ],
            onFilter: (value, record) => record.ageGroup.includes(value as string),
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={students}
                onRow={(record: FindStudentResultType) => ({
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
