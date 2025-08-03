import { Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";

interface ChildrenType {
    id: string;
    fullName: string;
    ageGroup: string;
}

interface ChildrenTableProps {
    childrenData: ChildrenType[];
    onDelete?: (id: string) => void;
}

const ChildrenTable: React.FC<ChildrenTableProps> = ({ childrenData, onDelete }) => {
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
        {
            title: t("forms.childrenTable.delete"),
            key: "delete",
            render: (_, record) => (
                <a onClick={() => onDelete?.(record.id)}>{t("forms.childrenTable.delete")}</a>
            ), //use record later to access child id to handle deletion
        },
    ];
    return <Table dataSource={childrenData} columns={columns} rowKey="id" pagination={false} />;
};

export default ChildrenTable;
