import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table, TableProps } from "antd";
import { FindUserResultType } from "./dummy.data";

const UserTable = ({ users }: { users: FindUserResultType[] }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const columns: TableProps<FindUserResultType>["columns"] = [
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            sorter: (a, b) => a.role.length - b.role.length,
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={users}
                onRow={(record: FindUserResultType) => ({
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
