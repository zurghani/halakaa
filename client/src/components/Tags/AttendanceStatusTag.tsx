import React from "react";
import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

import "./AttendanceStatusTag.scss";
type AttendanceStatusType = "present" | "absent" | "late";

interface AttendanceStatusTagProps {
    status: AttendanceStatusType;
}

const AttendanceStatusTag: React.FC<AttendanceStatusTagProps> = ({ status }) => {
    const statusConfig = {
        present: {
            color: "success",
            icon: <CheckCircleOutlined />,
        },
        absent: {
            color: "error",
            icon: <CloseCircleOutlined />,
        },
        late: {
            color: "default",
            icon: <ClockCircleOutlined />,
        },
    };
    const { color, icon } = statusConfig[status];
    return (
        <Tag icon={icon} color={color} className="attendance-tag">
            {status}
        </Tag>
    );
};

export default AttendanceStatusTag;
