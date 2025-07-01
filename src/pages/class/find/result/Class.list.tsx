import { List, Tag } from "antd";
import { FindClassResultType } from "./dummy.data";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ClassList = ({ classes }: { classes: FindClassResultType[] }) => {
  const navigate = useNavigate();

  return (
    <List
      itemLayout="horizontal"
      dataSource={classes}
      renderItem={(currentClass) => (
        <List.Item
          onClick={() => {
            navigate(`/class/${currentClass.id}`);
          }}
          actions={[
            <a key="view-class">
              <ArrowRightOutlined />
            </a>,
          ]}>
          <List.Item.Meta
            title={
              <>
                <Tag> ID : {currentClass.id}</Tag>
                Teacher: {currentClass.teacher}
                <br />
                <Tag color="green"> group: {currentClass.ageGroup}</Tag>
                <Tag>{currentClass.StartsAt}</Tag>
                <Tag>{currentClass.EndsAt}</Tag>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ClassList;
