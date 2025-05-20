import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store";
import { Card, Col, Progress, Row, Space } from "antd";
import "./StudentInfo.scss";

const StudentInfo: React.FC = () => {
  const student = useSelector((state: AppStore) => state.student);
  console.log(student);
  return (
    <div className="student-info">
      <ul className="student-info__list">
        <li className="student-info__row">
          <p className="student-info__row__item">Name:</p>
          <p className="student-info__row__item">{student.name}</p>
        </li>
        <li className="student-info__row">
          <p className="student-info__row__item">ID:</p>
          <p className="student-info__row__item">{student.id}</p>
          <p className="student-info__row__item">Gender:</p>
          <p className="student-info__row__item">{student.gender}</p>
          <p className="student-info__row__item">Age:</p>
          <p className="student-info__row__item">{student.age}</p>
        </li>
        <li className="student-info__row">
          <p className="student-info__row__item">Joined:</p>
          <p className="student-info__row__item">{student.joinDate}</p>
        </li>
        <li className="student-info__row">
          <p className="student-info__row__item">Stats:</p>
          <div className="student-info__row__item">
            <Progress
              type="circle"
              percent={Number(student.attendance)}
              size={80}
              style={{ marginBottom: "0.5rem" }}
            />
            <p>Attendance</p>
          </div>
          <div className="student-info__row__item">
            <Progress
              type="circle"
              percent={Number(student.successRate)}
              size={80}
              style={{ marginBottom: "0.5rem" }}
            />
            <p>Success rate</p>
          </div>
          <div className="student-info__row__item">
            <Progress
              type="circle"
              percent={Number(student.quranCompletion)}
              size={80}
              style={{ marginBottom: "0.5rem" }}
            />
            <p>Of the Quran</p>
          </div>
        </li>
        {/* <Row className="student-info__row">
        <Col span={3}>Name:</Col>
        <Col span={3}>{student.name}</Col>
      </Row>

      <Row>
        <Col span={3}>ID:</Col>
        <Col span={3}>{student.id}</Col>
        <Col span={3}>Gender:</Col>
        <Col span={3}>{student.gender}</Col>
        <Col span={3}>Age:</Col>
        <Col span={3}>{student.age}</Col>
      </Row>

      <Row>
        <Col span={3}>Joined:</Col>
        <Col span={3}>{student.joinDate}</Col>
      </Row>

      <Row>
        <Col span={3}>Stats:</Col>
        <Col span={3}>
          <Progress
            type="circle"
            percent={Number(student.attendance)}
            size={80}
          />
          <div>Attendance</div>
        </Col>
        <Col span={3}>
          <Progress
            type="circle"
            percent={Number(student.successRate)}
            size={80}
          />
          <div>Success rate</div>
        </Col>
        <Col span={3}>
          <Progress
            type="circle"
            percent={Number(student.quranCompletion)}
            size={80}
          />
          <div>Of the Quran</div>
        </Col>
      </Row> */}

        {/* <div className="student-info__row">
        <div className="student-info__label">Name:</div>
        <div className="student-info__value">{student.name}</div>
      </div>

      <div className="student-info__row">
        <div className="student-info__label">ID: </div>
        <div className="student-info__value">{student.id}</div>
        <div className="student-info__label">Gender: </div>
        <div className="student-info__value">{student.gender}</div>
        <div className="student-info__label">Age: </div>
        <div className="student-info__value">{student.age}</div>
      </div>

      <div className="student-info__row">
        <div className="student-info__label">Joined: </div>
        <div className="student-info__value">{student.joinDate}</div>
      </div>

      <div className="student-info__row">
        <div className="student-info__label">Stats:</div>
        <div>
          <Progress
            type="circle"
            percent={Number(student.attendance)}
            size={80}
          />
          <div className="student-info__label">Attendance</div>
        </div>
        <div>
          <Progress
            type="circle"
            percent={Number(student.successRate)}
            size={80}
          />
          <div className="student-info__label">Success rate</div>
        </div>
        <div>
          <Progress
            type="circle"
            percent={Number(student.quranCompletion)}
            size={80}
          />
          <div className="student-info__label">Of the Quran</div>
        </div>
      </div> */}
      </ul>
    </div>
  );
};

export default StudentInfo;
