import { GetProps, Input, Segmented, Space } from "antd";
import { useState } from "react";
import { UserRole } from "../../../../store/types";
import { UserSearchOptionsType } from "../../types";

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const roles = [UserRole.All, UserRole.Admin, UserRole.Teacher, UserRole.Parent];

type RoleType = (typeof roles)[number];

interface UserSearchFormProps {
    SearchOptions: UserSearchOptionsType;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ SearchOptions }) => {
    const [SearchType, setSearchType] = useState<keyof UserSearchOptionsType>(
        SearchOptions.name.value
    );
    const [role, setRole] = useState<RoleType>(UserRole.All);

    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        console.log("Source:", info?.source);
        console.log("Value:", value);
        console.log("Search Type:", SearchType);
        console.log("Role:", role);
    };
    return (
        <Space direction="vertical" style={{ width: "100%", marginBottom: "24px" }}>
            <Segmented<RoleType>
                value={role}
                options={roles.map((role) => ({
                    label: role.charAt(0).toUpperCase() + role.slice(1),
                    value: role,
                }))}
                onChange={(value) => setRole(value as RoleType)}
            />
            <Segmented<string>
                value={SearchType}
                options={Object.values(SearchOptions).map((option) => ({
                    label: option.label,
                    value: option.value,
                }))}
                onChange={(value) => {
                    setSearchType(value as keyof UserSearchOptionsType);
                }}
            />
            <Search
                type={SearchType === "phone" ? "tel" : "text"}
                addonBefore={SearchOptions[SearchType].label}
                placeholder={`Enter ${SearchOptions[SearchType].label}`}
                allowClear
                onSearch={onSearch}
            />
        </Space>
    );
};
export default UserSearchForm;
