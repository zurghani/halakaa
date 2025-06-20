import { List, Tag } from "antd";
import { FindStudentResultType } from "./dummy.data";
import { ArrowRightOutlined } from "@ant-design/icons";

const StudentList = ({ students }: { students: FindStudentResultType }) => (
  <List
    itemLayout="horizontal"
    dataSource={students}
    renderItem={(student) => (
      <List.Item
        onClick={() => console.log(`Viewing student: ${student.id}`)}
        actions={[
          <a key="view-student">
            <ArrowRightOutlined />
          </a>,
        ]}>
        <List.Item.Meta
          title={
            <>
              {student.name}
              <Tag> ID : {student.id}</Tag>
              <Tag color="green">Age group: {student.ageGroup}</Tag>
            </>
          }
        />
      </List.Item>
    )}
  />
);

export default StudentList;
