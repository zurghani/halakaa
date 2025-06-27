import { useSelector } from "react-redux";
import { AppStore } from "../../../store";
import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const StudentsList: React.FC = () => {
  const classes = useSelector((state: AppStore) => state.class[0]);
  const students = classes.students;
  return (
    <List
      itemLayout="horizontal"
      dataSource={students}
      renderItem={(student) => (
        <List.Item
          onClick={() => console.log(`Students: ${students}`)}
          actions={[
            <a key="teacher-view-classes">
              <ArrowRightOutlined />
            </a>,
          ]}>
          <List.Item.Meta
            title={
              <>
                <Tag>{student.name}</Tag>
                <Tag>{student.id}</Tag>
                <Tag color="blue">{classes.ageGroup}</Tag>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default StudentsList;
