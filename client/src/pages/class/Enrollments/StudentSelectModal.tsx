import React, { useState } from "react";
import { Modal, Select, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { Student } from "../../../types";
import { useStudents } from "../../../queries/students";

interface SelectStudentModalProps {
    open: boolean;
    onCancel: () => void;
    onCreate: (students: Student[]) => void;
    onSelect: (student: Student) => void;
}

const StudentSelectModal: React.FC<SelectStudentModalProps> = ({
    open,
    onCancel,
    onCreate,
    onSelect,
}) => {
    const { t } = useTranslation();
    const { data: students, isLoading } = useStudents();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleOk = () => {
        if (!students) return;
        const selectedStudents: Student[] = students.filter((s) => selectedIds.includes(s.id));
        onCreate(selectedStudents);
        setSelectedIds([]);
    };
    return (
        <Modal
            open={open}
            onCancel={() => {
                setSelectedIds([]);
                onCancel();
            }}
            onOk={handleOk}
            title={t("titles.selectStudent")}
            okText={t("general.add")}
            cancelText={t("general.cancel")}>
            {isLoading ? (
                <Spin />
            ) : (
                <Select
                    mode="multiple"
                    showSearch
                    style={{ width: "100%" }}
                    placeholder={t("titles.searchStudent")}
                    filterOption={(input, option) =>
                        (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                    }
                    options={students?.map((s) => ({ value: s.id, label: s.fullName })) ?? []}
                    value={selectedIds}
                    onChange={(values) => setSelectedIds(values)}
                />
            )}
        </Modal>
    );
};

export default StudentSelectModal;
