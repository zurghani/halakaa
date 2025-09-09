import { Button, Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { Student } from "../../../types";

interface ChildrenTableProps {
    childrenData: Student[];
    onDelete?: (id: string) => void;
    editable?: boolean;
}

const ChildrenTable: React.FC<ChildrenTableProps> = ({
    childrenData,
    onDelete,
    editable = false,
}) => {
    const { t } = useTranslation();
    const columns: TableProps<Student>["columns"] = [
        {
            title: t("forms.childrenTable.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("forms.childrenTable.name"),
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: t("general.dob"),
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
    ];

    if (editable) {
        columns.push({
            title: t("forms.childrenTable.delete"),
            key: "delete",
            render: (_, record) => (
                <Button danger size="small" onClick={() => onDelete?.(record.dateOfBirth)}>
                    {t("general.delete")}
                </Button>
            ),
        });
    }
    return <Table dataSource={childrenData} columns={columns} rowKey="id" pagination={false} />;
};

export default ChildrenTable;
