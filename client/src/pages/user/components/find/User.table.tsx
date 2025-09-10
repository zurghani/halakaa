import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table, TableProps } from "antd";
import { useTags } from "../../../../hooks/useTags";
import { User } from "../../../../types";

const UserTable = ({ users }: { users: User[] }) => {
    const { roleTags } = useTags({});
    const { t } = useTranslation();
    const navigate = useNavigate();

    const columns: TableProps<User>["columns"] = [
        {
            title: t("forms.phone"),
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: t("forms.fullName"),
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: t("forms.email"),
            dataIndex: "email",
            key: "email",
        },
        {
            title: t("forms.role"),
            dataIndex: "role",
            key: "role",
            render: (_, record) => roleTags[record.id] || record.role,
        },
    ];
    return (
        <>
            <Table
                pagination={false}
                columns={columns}
                dataSource={users}
                onRow={(record: User) => ({
                    onClick: () => {
                        // handle row click here
                        navigate(`/user/${record.id}`);
                    },
                })}
            />
        </>
    );
};

export default UserTable;
