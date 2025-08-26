import React from "react";
import { Table, TableProps } from "antd";
import { useSelector } from "react-redux";
import { AppStore } from "../../../store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTags } from "../../../hooks/useTags";

// interface DataType {
//   key: string;
//   teacher: string;
//   type: TaskType;
//   from: string;
//   to: string;
//   date: string;
// }

const MyClassesTable: React.FC = () => {
    const navigate = useNavigate();
    const { ageGroupTags } = useTags({});
    const { t } = useTranslation();
    const classes = useSelector((state: AppStore) => state.class);
    const data = classes.map((teacherClass) => ({
        id: teacherClass.id,
        teacherId: teacherClass.teacherId,
        ageGroup: teacherClass.ageGroup,
        start: teacherClass.time.start,
        end: teacherClass.time.end,
    }));

    const columns: TableProps["columns"] = [
        {
            title: t("class.classID"),
            dataIndex: "id",
            key: "id",
            filters: [
                {
                    text: "10001",
                    value: "10001",
                },
                {
                    text: "10003",
                    value: "10003",
                },

                {
                    text: "10005",
                    value: "10005",
                },
            ],
            onFilter: (value, record) => record.id.indexOf(value as string) === 0,
            defaultSortOrder: "descend",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: t("class.teacher"),
            dataIndex: "teacherId",
            key: "teacherId",
            filters: [
                {
                    text: "20001",
                    value: "20001",
                },
                {
                    text: "20003",
                    value: "20003",
                },

                {
                    text: "20005",
                    value: "20005",
                },
            ],
            onFilter: (value, record) => record.teacherId.indexOf(value as string) === 0,
            defaultSortOrder: "descend",
            sorter: (a, b) => a.teacherId - b.teacherId,
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
        {
            title: t("class.startsAt"),
            dataIndex: "start",
            key: "start",
            filters: [
                {
                    text: "9:00 AM",
                    value: "9:00 AM",
                },
                {
                    text: "1:00 PM",
                    value: "1:00 PM",
                },

                {
                    text: "6:00 PM",
                    value: "6:00 PM",
                },
            ],
            onFilter: (value, record) => record.start.indexOf(value as string) === 0,
            defaultSortOrder: "descend",
            sorter: (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start),
        },
        {
            title: t("class.endsAt"),
            dataIndex: "end",
            key: "end",
            filters: [
                {
                    text: "11:00 AM",
                    value: "11:00 AM",
                },
                {
                    text: "4:00 PM",
                    value: "4:00 PM",
                },

                {
                    text: "8:00 PM",
                    value: "8:00 PM",
                },
            ],
            onFilter: (value, record) => record.end.indexOf(value as string) === 0,
            defaultSortOrder: "descend",
            sorter: (a, b) => timeToMinutes(a.end) - timeToMinutes(b.end),
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
                        navigate(`/class/${row.id}`);
                    },
                })}
            />
        </>
    );
};

export default MyClassesTable;

const timeToMinutes = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (hours === 12) hours = 0;
    if (modifier === "PM") hours += 12;

    return hours * 60 + minutes;
};
