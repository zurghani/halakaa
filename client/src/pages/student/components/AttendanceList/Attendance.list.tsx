import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";
import { Attendance } from "../../../../types";

const AttendanceList = ({ attendance }: { attendance: Attendance[] }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={attendance}
            renderItem={(attendance) => (
                <List.Item
                    onClick={() => console.log(`Attendance: ${attendance.date}`)}
                    actions={[
                        <a key="view-attendance">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                {attendance.teacherId}
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
