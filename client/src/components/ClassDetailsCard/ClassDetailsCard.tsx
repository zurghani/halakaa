import { Badge, Col, Row, Tag } from "antd";
import { useTranslation } from "react-i18next";
import "./ClassDetailsCard.scss";
import { ClassWithTeacherInfo } from "../../types";
import { useAgeGroup } from "../../queries/ageGroups";
import dayjs from "dayjs";

const ClassDetailsCard = ({
    data,
    classSize,
}: {
    data: ClassWithTeacherInfo;
    classSize?: number;
}) => {
    const { t } = useTranslation();
    const ageGroupId = typeof data.ageGroup === "number" ? data.ageGroup.toString() : data.ageGroup;
    const { data: ageGroup, isLoading } = useAgeGroup(ageGroupId ?? "");
    if (isLoading) return <div>Loading....</div>;
    return (
        <>
            <Row gutter={[16, 8]} className="out-line">
                <Col span={4}>{t("class.classID")}:</Col>
                <Col span={20}>{data.id}</Col>

                <Col span={4}>{t("class.description")}:</Col>
                <Col span={20}>{data.description}</Col>

                <Col span={4}>{t("class.teacher")}:</Col>
                <Col span={20}>{data.teacher?.name}</Col>

                {/* TODO: replace with the actual age group tag, once it is developed. */}
                <Col span={4}>{t("class.ageGroup")}:</Col>
                <Col span={20}>
                    <Tag color="blue">{`${ageGroup?.from}-${ageGroup?.to}`}</Tag>
                </Col>

                <Col span={4}>{t("class.startsAt")}:</Col>
                <Col span={20}>
                    {data.startsAt ? dayjs(data.startsAt, "HH:mm:ss").format("hh:mm A") : "-"}
                </Col>

                <Col span={4}>{t("class.endsAt")}:</Col>
                <Col span={20}>
                    {data.endsAt ? dayjs(data.endsAt, "HH:mm:ss").format("hh:mm A") : "-"}
                </Col>
                <Col span={4}>{t("class.classSize")}:</Col>
                <Col span={20}>
                    <Badge
                        count={classSize ?? 0}
                        style={{ backgroundColor: "#E6F7FF", color: "#1890FF" }}
                    />
                    &nbsp; {t("class.students")}
                </Col>
            </Row>
        </>
    );
};

export default ClassDetailsCard;
