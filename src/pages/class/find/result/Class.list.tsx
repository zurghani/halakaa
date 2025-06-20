import { List, Tag } from "antd";
import { FindClassResultType } from "./dummy.data";
import { ArrowRightOutlined } from "@ant-design/icons";

const ClassList = ({ classes }: { classes: FindClassResultType[] }) => (
  <List
    itemLayout="horizontal"
    dataSource={classes}
    renderItem={(currentClass) => (
      <List.Item
        onClick={() => console.log(`Viewing Class: ${currentClass.id}`)}
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

export default ClassList;
