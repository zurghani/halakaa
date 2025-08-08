import { Button, Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";

interface ChildrenType {
    id: string;
    fullName: string;
    ageGroup: string;
    editable?: boolean; // Optional property to indicate if the child is editable
}

interface ChildrenTableProps {
    childrenData: ChildrenType[];
    onDelete?: (id: string) => void;
    editable?: boolean;
}

const ChildrenTable: React.FC<ChildrenTableProps> = ({
    childrenData,
    onDelete,
    editable = false,
}) => {
    const { t } = useTranslation();
    const columns: TableProps<ChildrenType>["columns"] = [
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
            title: t("forms.childrenTable.ageGroup"),
            dataIndex: "ageGroup",
            key: "ageGroup",
        },
    ];

    if (editable) {
        columns.push({
            title: t("forms.childrenTable.delete"),
            key: "delete",
            render: (_, record) => (
                <Button danger size="small" onClick={() => onDelete?.(record.id)}>
                    {t("general.delete")}
                </Button>
            ),
        });
    }
    return <Table dataSource={childrenData} columns={columns} rowKey="id" pagination={false} />;
};

export default ChildrenTable;
