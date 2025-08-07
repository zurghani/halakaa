import React from "react";
import { Modal, Select } from "antd";
import { Student } from "../types"; // Create if doesn't exist
import { useTranslation } from "react-i18next";

interface SelectStudentModalProps {
    open: boolean;
    students: Student[];
    onCancel: () => void;
    onSelect: (student: Student) => void;
}

const StudentSelectModal: React.FC<SelectStudentModalProps> = ({
    open,
    students,
    onCancel,
    onSelect,
}) => {
    const { t } = useTranslation();
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={onCancel}
            footer={null}
            title={t("titles.selectStudent")}>
            <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={t("titles.searchStudent")}
                filterOption={(input, option) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                }
                options={students.map((s) => ({ value: s.id, label: s.fullName }))}
                onSelect={(value) => {
                    const selected = students.find((s) => s.id === value);
                    if (selected) {
                        onSelect(selected);
                    }
                }}
            />
        </Modal>
    );
};

export default StudentSelectModal;
