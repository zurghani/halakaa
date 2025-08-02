import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserListItem } from "../../types";

interface UserListProps {
    users: UserListItem[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const navigate = useNavigate();
    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
                <List.Item
                    onClick={() => {
                        navigate(`/user/${user.id}`);
                    }}
                    actions={[
                        <a key="view-user">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                {user.fullName}
                                <Tag>{user.phone}</Tag>
                                <Tag color="green">{user.role}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default UserList;
