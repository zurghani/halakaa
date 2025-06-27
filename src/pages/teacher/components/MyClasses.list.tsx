import { useSelector } from "react-redux";
import { AppStore } from "../../../store";
import { List, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MyClassesList: React.FC = () => {
  const navigate = useNavigate();

  const classes = useSelector((state: AppStore) => state.class);

  return (
    <List
      itemLayout="horizontal"
      dataSource={classes}
      renderItem={(classItem) => (
        <List.Item
          onClick={() => {
            navigate(`/class/${classItem.id}`);
          }}
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
