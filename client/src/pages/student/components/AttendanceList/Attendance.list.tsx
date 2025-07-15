import { List, Tag } from "antd";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../store";
import { ArrowRightOutlined } from "@ant-design/icons";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";

const AttendanceList: React.FC = () => {
  const attendance = useSelector((state: AppStore) => state.student.attendance);

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
