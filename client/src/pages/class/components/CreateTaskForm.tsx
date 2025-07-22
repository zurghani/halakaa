import React from "react";
import { DatePicker, Form, Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import TaskTypeTag, { TaskType } from "../../../components/Tags/TaskTypeTag";

type TagRender = SelectProps["tagRender"];
// dummy data for verses
const verseOptions = [
    { label: "Verse1", value: "verse1" },
    { label: "Verse2", value: "verse2" },
    { label: "Verse3", value: "verse3" },
    { label: "Verse4", value: "verse4" },
    { label: "Verse5", value: "verse5" },
    { label: "Verse6", value: "verse6" },
];

export type FieldType = {
    type?: TaskType[];
    from?: string;
    to?: string;
    due?: string;
};

interface Props {
    form: any;
    onFinish: (values: FieldType) => void;
}
const CreateTaskForm: React.FC<Props> = ({ form, onFinish }) => {
    const { t } = useTranslation();

    const options: SelectProps["options"] = [
        { value: t("tags.memorization") },
        { value: t("tags.revision") },
        { value: t("tags.reciting") },
    ];
    return (
        <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 6 }}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{
                type: [],
                from: undefined,
                to: undefined,
            }}>
            <Form.Item<FieldType>
                label={t("createTaskModal.type")}
                name="type"
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectTypeError"),
                    },
                ]}>
                <Select
                    mode="multiple"
                    placeholder={t("createTaskModal.selectType")}
                    tagRender={tagRender}
                    options={options}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label={t("createTaskModal.from")}
                name="from"
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectFromError"),
                    },
                ]}>
                <Select
                    placeholder={t("createTaskModal.selectFrom")}
                    options={verseOptions}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label={t("createTaskModal.to")}
                name="to"
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectToError"),
                    },
                ]}>
                <Select
                    placeholder={t("createTaskModal.selectTo")}
                    options={verseOptions}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label={t("createTaskModal.due")}
                name="due"
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectDueError"),
                    },
                ]}>
                <DatePicker
                    placeholder={t("createTaskModal.due")}
                    style={{ width: "100%" }}
                />
            </Form.Item>
        </Form>
    );
};
export default CreateTaskForm;

const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <TaskTypeTag
            key={value}
            type={value as TaskType}
            closeIcon={closable ? "show" : "hide"}
            onClose={onClose}
        />
    );
};
