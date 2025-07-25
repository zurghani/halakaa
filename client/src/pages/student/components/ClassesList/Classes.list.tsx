import { List, Tag } from "antd";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../store";
import { ArrowRightOutlined } from "@ant-design/icons";

const ClassesList: React.FC = () => {
    const studentClasses = useSelector((state: AppStore) => state.class);
    const data = studentClasses.map((studentClass) => ({
        id: studentClass.id,
        teacherId: studentClass.teacherId,
        ageGroup: studentClass.ageGroup,
        start: studentClass.time.start,
        end: studentClass.time.end,
    }));

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(currentClass) => (
                <List.Item
                    onClick={() => console.log(`Class: ${currentClass.id}`)}
                    actions={[
                        <a key="view-class">
                            <ArrowRightOutlined />
                        </a>,
                    ]}>
                    <List.Item.Meta
                        title={
                            <>
                                {currentClass.id}
                                <Tag>{currentClass.teacherId}</Tag>
                                <Tag>{currentClass.ageGroup}</Tag>
                                <br />
                                <Tag color="green">{currentClass.start}</Tag>
                                <Tag color="purple">{currentClass.end}</Tag>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ClassesList;
