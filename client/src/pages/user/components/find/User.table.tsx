import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table, TableProps } from "antd";
import { User } from "../../types";
import { useTags } from "../../../../hooks/useTags";

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
            dataIndex: "fullName",
            key: "fullName",
            sorter: (a, b) => a.fullName.length - b.fullName.length,
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
            render: (role: string) => roleTags[role] || role,
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
