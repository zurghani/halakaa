import React, { useState } from "react";
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    InputNumber,
    Select,
    SelectProps,
} from "antd";
import { useTranslation } from "react-i18next";
import TaskTypeTag, { TaskType } from "../../../components/Tags/TaskTypeTag";
import TextArea from "antd/es/input/TextArea";

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
    complete?: boolean;
    mistakes?: Number;
    notes?: string;
};

interface Props {
    form: any;
    onFinish: (values: FieldType) => void;
}
const EditTaskForm: React.FC<Props> = ({ form, onFinish }) => {
    const { t } = useTranslation();
    const [complete, setComplete] = useState(false);

    const options: SelectProps["options"] = [
        { value: "memorization", label: t("tags.memorization") },
        { value: "revision", label: t("tags.revision") },
        { value: "reciting", label: t("tags.reciting") },
    ];

    const handleCompleteTask = (e: any) => {
        setComplete(e.target.checked);
    };
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
                complete: false,
            }}>
            <Form.Item<FieldType>
                label={t("editTaskModal.type")}
                name="type"
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectTypeError"),
                    },
                ]}>
                <Select
                    mode="multiple"
                    placeholder={t("editTaskModal.selectType")}
                    tagRender={tagRender}
                    options={options}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label={t("editTaskModal.from")}
                name="from"
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectFromError"),
                    },
                ]}>
                <Select
                    placeholder={t("editTaskModal.selectFrom")}
                    options={verseOptions}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label={t("editTaskModal.to")}
                name="to"
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectToError"),
                    },
                ]}>
                <Select
                    placeholder={t("editTaskModal.selectTo")}
                    options={verseOptions}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label={t("editTaskModal.due")}
                name="due"
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectDueError"),
                    },
                ]}>
                <DatePicker
                    placeholder={t("editTaskModal.due")}
                    style={{ width: "100%" }}
                />
            </Form.Item>
            <Form.Item<FieldType>
                label={t("editTaskModal.complete")}
                name="complete"
                valuePropName="checked">
                <Checkbox onChange={handleCompleteTask}></Checkbox>
            </Form.Item>

            {complete && (
                <>
                    <Form.Item<FieldType>
                        label={t("editTaskModal.mistakes")}
                        name="mistakes">
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={t("editTaskModal.notes")}
                        name="notes">
                        <TextArea rows={4} />
                    </Form.Item>
                </>
            )}
        </Form>
    );
};
export default EditTaskForm;

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
