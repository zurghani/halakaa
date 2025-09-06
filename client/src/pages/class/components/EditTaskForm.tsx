import React, { useState } from "react";
import { Checkbox, DatePicker, Form, InputNumber, Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import TaskTypeTag, { TaskType } from "../../../components/Tags/TaskTypeTag";
import TextArea from "antd/es/input/TextArea";
import { TaskExpanded } from "../../../types";
import { FormInstance } from "antd/lib";
import { useSearchAyahs } from "../../../queries/ayahs";
import { useTaskTypes } from "../../../queries/taskTypes";
import dayjs from "dayjs";

type TagRender = SelectProps["tagRender"];

interface EditTaskFormProps {
    onFinish: (values: TaskExpanded) => void;
    disabled?: boolean;
    initialValues?: TaskExpanded | any;
    form: FormInstance;
}
const EditTaskForm: React.FC<EditTaskFormProps> = ({ form, onFinish, disabled, initialValues }) => {
    const { t } = useTranslation();
    const [complete, setComplete] = useState(false);
    const initialTask = {
        ...initialValues,
        dueDate: initialValues?.dueDate ? dayjs(initialValues.dueDate, "YYYY-MM-DD") : null,
    } as TaskExpanded;

    const [ayahSearchFrom, setAyahSearchFrom] = useState(initialTask.startingAyah?.text ?? "-");
    const [ayahSearchTo, setAyahSearchTo] = useState(initialTask.endingAyah?.text ?? "-");

    const { data: fromAyahOptions, isLoading: fromAyahLoading } = useSearchAyahs({
        like: ayahSearchFrom,
    });
    const { data: toAyahOptions, isLoading: toAyahLoading } = useSearchAyahs({
        like: ayahSearchTo,
    });

    const { data: taskTypes, isLoading: taskTypesLoading } = useTaskTypes();

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
            initialValues={initialTask}>
            <Form.Item
                label={t("editTaskModal.type")}
                name="taskType"
                getValueProps={(value) => ({ value: value.id })}
                rules={[
                    {
                        required: true,
                        message: t("editTaskModal.selectTypeError"),
                    },
                ]}>
                <Select
                    loading={taskTypesLoading}
                    filterOption={false}
                    mode="multiple"
                    maxCount={1}
                    placeholder={t("editTaskModal.selectType")}
                    optionLabelProp="label"
                    options={taskTypes?.map((type) => ({ label: type.name, value: type.id }))}
                />
            </Form.Item>

            <Form.Item
                label={t("editTaskModal.from")}
                name="startingAyah"
                getValueProps={(value) => ({ value: value.ayahId })}
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
                    optionLabelProp="displayName"
                    options={fromAyahOptions?.map((ayah) => {
                        return {
                            label: `${ayah.surahName} (${ayah.number}) - ${ayah.text?.split(" ").slice(0, 5).join(" ")}`,
                            value: ayah.id,
                            displayName: `${ayah.surahName} (${ayah.number})`,
                        };
                    })}
                />
            </Form.Item>

            <Form.Item
                label={t("editTaskModal.to")}
                name="endingAyah"
                getValueProps={(value) => ({ value: value.ayahId })}
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
                    optionLabelProp="displayName"
                    options={toAyahOptions?.map((ayah) => {
                        return {
                            label: `${ayah.surahName} (${ayah.number}) - ${ayah.text?.split(" ").slice(0, 5).join(" ")}`,
                            value: ayah.id,
                            displayName: `${ayah.surahName} (${ayah.number})`,
                        };
                    })}
                />
            </Form.Item>

            <Form.Item
                label={t("editTaskModal.due")}
                name="dueDate"
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
