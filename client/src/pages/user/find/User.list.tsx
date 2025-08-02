import { List, Tag } from "antd";
import { FindUserResultType } from "./dummy.data";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserList = ({ users }: { users: FindUserResultType[] }) => {
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
                                {user.name}
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
