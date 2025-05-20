import { Badge, Col, Row, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store";
import { useTranslation } from "react-i18next";

const ClassInfo: React.FC = () => {
  const class_ = useSelector((state: AppStore) => state.class);
  const { t } = useTranslation();

  console.log(class_);
  return (
    <>
      <Row gutter={[16, 8]} className="student-section__info">
        <Col span={4}>{t("class.classID")}:</Col>
        <Col span={20}>{class_.id}</Col>

        <Col span={4}>{t("class.description")}:</Col>
        <Col span={20}>{class_.description}</Col>

        <Col span={4}>{t("class.teacher")}:</Col>
        <Col span={20}>{class_.teacher}</Col>

        <Col span={4}>{t("class.ageGroup")}:</Col>
        <Col span={20}>
          <Tag color="blue">{class_.ageGroup}</Tag>
        </Col>

        <Col span={4}>{t("class.startsAt")}:</Col>
        <Col span={20}>{class_.startTime}</Col>

        <Col span={4}>{t("class.endsAt")}:</Col>
        <Col span={20}>{class_.endTime}</Col>

        <Col span={4}>{t("class.classSize")}:</Col>
        <Col span={20}>
          <Badge
            count={class_.classSize}
            style={{ backgroundColor: "#E6F7FF", color: "#1890FF" }}
          />
          &nbsp; {t("class.students")}
        </Col>
      </Row>
    </>
  );
};

export default ClassInfo;
