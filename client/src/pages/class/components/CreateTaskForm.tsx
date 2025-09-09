import React, { useState } from "react";
import { DatePicker, Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import { NewTask } from "../../../types";
import { useSearchAyahs } from "../../../queries/ayahs";
import { useTaskTypes } from "../../../queries/taskTypes";

interface Props {
    form: any;
    onFinish: (values: NewTask) => void;
}
const CreateTaskForm: React.FC<Props> = ({ form, onFinish }) => {
    const { t } = useTranslation();

    const [ayahSearchFrom, setAyahSearchFrom] = useState("-");
    const [ayahSearchTo, setAyahSearchTo] = useState("-");
    const { data: fromAyahOptions, isLoading: fromAyahLoading } = useSearchAyahs({
        like: ayahSearchFrom,
    });
    const { data: toAyahOptions, isLoading: toAyahLoading } = useSearchAyahs({
        like: ayahSearchTo,
    });

    const { data: taskTypes, isLoading: taskTypesLoading } = useTaskTypes();

    return (
        <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 6 }}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}>
            <Form.Item
                label={t("createTaskModal.type")}
                name="taskTypeId"
                getValueProps={(value) => ({ value: value })}
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectTypeError"),
                    },
                ]}>
                <Select
                    loading={taskTypesLoading}
                    filterOption={false}
                    mode="multiple"
                    maxCount={1}
                    placeholder={t("createTaskModal.selectType")}
                    optionLabelProp="label"
                    options={taskTypes?.map((type) => ({
                        label: type.name,
                        value: type.id,
                    }))}
                />
            </Form.Item>

            <Form.Item
                label={t("createTaskModal.from")}
                name="startingAyahId"
                getValueProps={(value) => ({ value: value })}
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectFromError"),
                    },
                ]}>
                <Select
                    showSearch
                    onSearch={setAyahSearchFrom}
                    loading={fromAyahLoading}
                    filterOption={false}
                    mode="multiple"
                    maxCount={1}
                    placeholder={t("createTaskModal.selectFrom")}
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
                label={t("createTaskModal.to")}
                name="endingAyahId"
                getValueProps={(value) => ({ value: value })}
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectToError"),
                    },
                ]}>
                <Select
                    showSearch
                    onSearch={setAyahSearchTo}
                    loading={toAyahLoading}
                    filterOption={false}
                    mode="multiple"
                    maxCount={1}
                    placeholder={t("createTaskModal.selectTo")}
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
                label={t("createTaskModal.due")}
                name="dueDate"
                rules={[
                    {
                        required: true,
                        message: t("createTaskModal.selectDueError"),
                    },
                ]}>
                <DatePicker placeholder={t("createTaskModal.due")} style={{ width: "100%" }} />
            </Form.Item>
        </Form>
    );
};
export default CreateTaskForm;
