import { useSelector } from "react-redux";
import { AppStore } from "../../../store";
import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const MyClassesList: React.FC = () => {
  const classes = useSelector((state: AppStore) => state.class);

  return (
    <List
      itemLayout="horizontal"
      dataSource={classes}
      renderItem={(classItem) => (
        <List.Item
          onClick={() => console.log(`Classes: ${classes}`)}
          actions={[
            <a key="teacher-view-classes">
              <ArrowRightOutlined />
            </a>,
          ]}>
          <List.Item.Meta
            title={
              <>
                <Tag>{classItem.id}</Tag>
                <Tag>{classItem.teacherId}</Tag>
                <Tag color="blue">{classItem.ageGroup}</Tag>
                <Tag color="green">{classItem.time.start}</Tag>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default MyClassesList;
