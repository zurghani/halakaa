import { Col, Progress, Row } from "antd";

import "./StudentDetailsCard.scss";
import { useTranslation } from "react-i18next";
import { Student } from "../../types";

const StudentStat = ({ percentage, legend }: { percentage: number; legend: string }) => {
    return (
        <div className="student-section__stat">
            <Progress type="circle" percent={Number(percentage)} size={80} />
            <p>{legend}</p>
        </div>
    );
};
const StudentDetailsCard = ({ student }: { student: Student }) => {
    const { t } = useTranslation();
    return (
        <>
            <Row gutter={[16, 8]} className="student-section__info">
                <Col span={4}>{t("general.id")}</Col>
                <Col span={20}>{student.id}</Col>

                <Col span={4}>{t("general.name")}</Col>
                <Col span={20}>{student.fullName}</Col>

                <Col span={4}>{t("general.dob")}</Col>
                <Col span={20}>{student.dateOfBirth}</Col>
                {/* NOT SUPPORTE WITH CURRENT STUDENT TYPE */}
                {/* <Col span={4}>Joined:</Col>
        <Col span={20}>{student.joinDate}</Col> */}
            </Row>
            <Row justify="space-between" align="middle">
                <Col span={6}>
                    <StudentStat percentage={75} legend={t("general.ofTheQuran")}></StudentStat>
                </Col>
                <Col span={6}>
                    <StudentStat percentage={50} legend={t("general.success")}></StudentStat>
                </Col>
                <Col span={6}>
                    <StudentStat percentage={25} legend={t("general.attendance")}></StudentStat>
                </Col>
            </Row>
        </>
    );
};

export default StudentDetailsCard;
