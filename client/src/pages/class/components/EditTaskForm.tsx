import React, { useState } from "react";
import { Checkbox, DatePicker, Form, InputNumber, Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import TaskTypeTag, { TaskType } from "../../../components/Tags/TaskTypeTag";
import TextArea from "antd/es/input/TextArea";
import { TaskExpanded } from "../../../types";
import { FormInstance } from "antd/lib";
import { useAyahs } from "../../../queries/ayahs";

type TagRender = SelectProps["tagRender"];

interface EditTaskFormProps {
    onFinish: (values: TaskExpanded) => void;
    disabled?: boolean;
    defaultValues?: TaskExpanded | any;
    form: FormInstance;
    onSubmit?: (data: any) => void;
}
const EditTaskForm: React.FC<EditTaskFormProps> = ({ form, onFinish }) => {
    const { t } = useTranslation();
    const [complete, setComplete] = useState(false);
    const [ayahSearchFrom, setAyahSearchFrom] = useState("-");
    const [ayahSearchTo, setAyahSearchTo] = useState("-");

    const { data: fromAyahOptions, isLoading: fromAyahLoading } = useAyahs({
        like: ayahSearchFrom,
    });
    const { data: toAyahOptions, isLoading: toAyahLoading } = useAyahs({ like: ayahSearchTo });
    const options: SelectProps["options"] = [
        { value: "memorization", label: t("tags.memorization") },
        { value: "revision", label: t("tags.revision") },
        { value: "reciting", label: t("tags.reciting") },
    ];

    const handleCompleteTask = (e: any) => {
        setComplete(e.target.checked);
    };
    console.log(fromAyahOptions);
    return (
        <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 6 }}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{}}>
            <Form.Item
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
                    maxCount={1}
                    placeholder={t("editTaskModal.selectType")}
                    tagRender={taskTypeTagsRenderer}
                    options={options}
                />
            </Form.Item>

            <Form.Item
                label={t("editTaskModal.from")}
                name="from"
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectFromError"),
                    },
                ]}>
                <Select
                    showSearch
                    onSearch={setAyahSearchFrom}
                    loading={fromAyahLoading}
                    filterOption={false}
                    mode="multiple"
                    maxCount={1}
                    placeholder={t("editTaskModal.selectFrom")}
                    options={fromAyahOptions?.map((ayah) => {
                        return {
                            label: `${ayah.surahName}`,
                            value: ayah.id,
                        };
                    })}
                />
            </Form.Item>

            <Form.Item
                label={t("editTaskModal.to")}
                name="to"
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectToError"),
                    },
                ]}>
                <Select
                    showSearch
                    onSearch={setAyahSearchTo}
                    loading={toAyahLoading}
                    filterOption={false}
                    mode="multiple"
                    maxCount={1}
                    placeholder={t("editTaskModal.selectTo")}
                    options={toAyahOptions || []}
                />
            </Form.Item>

            <Form.Item
                label={t("editTaskModal.due")}
                name="due"
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectDueError"),
                    },
                ]}>
                <DatePicker placeholder={t("editTaskModal.due")} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label={t("editTaskModal.complete")} name="complete" valuePropName="checked">
                <Checkbox onChange={handleCompleteTask}></Checkbox>
            </Form.Item>

            {complete && (
                <>
                    <Form.Item label={t("editTaskModal.mistakes")} name="mistakes">
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label={t("editTaskModal.notes")} name="notes">
                        <TextArea rows={4} />
                    </Form.Item>
                </>
            )}
        </Form>
    );
};
export default EditTaskForm;

const taskTypeTagsRenderer: TagRender = ({ value, onClose }) => {
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <TaskTypeTag
            key={value}
            type={value as TaskType}
            closable
            onClose={onClose}
            onMouseDown={onPreventMouseDown}
        />
    );
};
