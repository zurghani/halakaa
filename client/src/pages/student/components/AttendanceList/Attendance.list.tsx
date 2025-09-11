import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";
import { AttendanceWithTeacher } from "../../../../types";

const AttendanceList = ({ attendance }: { attendance: AttendanceWithTeacher[] }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={attendance}
            renderItem={(attendance) => (
                <List.Item
                    actions={[
                        <a key="view-attendance">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                <Tag>{attendance.teacher.name}</Tag>
                                <Tag>{attendance.date}</Tag>
                                <AttendanceStatusTag status={attendance.status} />
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default AttendanceList;
