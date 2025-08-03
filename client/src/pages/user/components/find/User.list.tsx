import React from "react";
import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { rolesObject, UserListItem } from "../../types";
import { generalTags } from "../../../../components/Tags/GeneralTag";

interface UserListProps {
    users: UserListItem[];
}

const roleTages = generalTags(
    rolesObject.map((role) => ({
        label: role,
    }))
);

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
                                {roleTages[user.role]}
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default UserList;
