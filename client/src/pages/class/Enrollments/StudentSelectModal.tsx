import React from "react";
import { Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Student } from "../../../types";

interface SelectStudentModalProps {
    isOpen: boolean;
    students: Student[];
    onCancel: () => void;
    onCreate: (students: Student[]) => void;
    onSelect: (student: Student) => void;
}

const StudentSelectModal: React.FC<SelectStudentModalProps> = ({
    isOpen,
    students,
    onCancel,
    onCreate,
    onSelect,
}) => {
    const { t } = useTranslation();
    return (
        <Modal
            open={isOpen}
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
