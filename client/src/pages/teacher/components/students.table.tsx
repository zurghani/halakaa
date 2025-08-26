import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Table, TableProps } from "antd";
import { AppStore } from "../../../store";
import { useTags } from "../../../hooks/useTags";

// interface DataType {
//   key: string;
//   teacher: string;
//   type: TaskType;
//   from: string;
//   to: string;
//   date: string;
// }

const StudentsTable: React.FC = () => {
    const { ageGroupTags } = useTags({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    const students = useSelector((state: AppStore) => state.class[0]);
    const data = students.students.map((student) => ({
        id: student.id,
        studentName: student.name,
        ageGroup: students.ageGroup,
    }));

    const columns: TableProps["columns"] = [
        {
            title: t("class.id"),
            dataIndex: "id",
            key: "id",

            defaultSortOrder: "descend",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: t("class.name"),
            dataIndex: "studentName",
            key: "studentName",
            filters: [
                {
                    text: "Sara",
                    value: "Sara",
                },
                {
                    text: "Fatima",
                    value: "Fatima",
                },
            ],
            onFilter: (value, record) => record.studentName.indexOf(value as string) === 0,
            defaultSortOrder: "descend",
            sorter: (a, b) => a.studentName - b.studentName,
        },
        {
            title: t("class.ageGroup"),
            dataIndex: "ageGroup",
            key: "ageGroup",
            render: (ageGroup) => ageGroupTags[ageGroup],
            filters: [
                {
                    text: "5 - 8",
                    value: "5 - 8",
                },
                {
                    text: "6 - 10",
                    value: "6 - 10",
                },

                {
                    text: "8 - 12",
                    value: "8 - 12",
                },
            ],
            onFilter: (value, record) => record.ageGroup.indexOf(value as string) === 0,
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                const [aMin] = a.ageGroup.split(" - ").map(Number);
                const [bMin] = b.ageGroup.split(" - ").map(Number);
                return aMin - bMin;
            },
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(row) => `Row - ${row.id}`}
                onRow={(row) => ({
                    onClick: () => {
                        navigate(`/student/${row.id}`);
                    },
                })}
            />
        </>
    );
};

export default StudentsTable;
