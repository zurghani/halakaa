import React from "react";
import { Badge, Col, Row, Tag } from "antd";
import { useSelector } from "react-redux";
import { AppStore } from "../../store";
import { useTranslation } from "react-i18next";
import "./ClassDetailsCard.scss";

const ClassDetailsCard: React.FC = () => {
    const classInfo = useSelector((state: AppStore) => state.class)[0];
    const { t } = useTranslation();

    return (
        <>
            <Row gutter={[16, 8]} className="out-line">
                <Col span={4}>{t("class.classID")}:</Col>
                <Col span={20}>{classInfo.id}</Col>

                <Col span={4}>{t("class.description")}:</Col>
                <Col span={20}>{classInfo.description}</Col>

                <Col span={4}>{t("class.teacher")}:</Col>
                <Col span={20}>{classInfo.teacherId}</Col>

                {/* TODO: replace with the actual age group tag, once it is developed. */}
                <Col span={4}>{t("class.ageGroup")}:</Col>
                <Col span={20}>
                    <Tag color="blue">{classInfo.ageGroup}</Tag>
                </Col>

                <Col span={4}>{t("class.startsAt")}:</Col>
                <Col span={20}>{classInfo.time.start}</Col>

                <Col span={4}>{t("class.endsAt")}:</Col>
                <Col span={20}>{classInfo.time.end}</Col>
                <Col span={4}>{t("class.classSize")}:</Col>
                <Col span={20}>
                    <Badge
                        count={classInfo.students?.length}
                        style={{ backgroundColor: "#E6F7FF", color: "#1890FF" }}
                    />
                    &nbsp; {t("class.students")}
                </Col>
            </Row>
        </>
    );
};

export default ClassDetailsCard;
