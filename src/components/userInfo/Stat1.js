import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';

const { Title } = Typography;

export default function Stat1({
  totalTime,
  avgTypeSpeed,
  bestTypeSpeed,
  avgTypo,
  bestData,
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Row gutter={[0, 48]}>
        <Title level={2}>All Time Statistics :</Title>
      </Row>
      <Row type="flex" justify="center" gutter={[0, 48]}>
        <Col span={6}>
          <Statistic title="Total Time:" value={totalTime} />
        </Col>
        <Col span={6}>
          <Statistic title="Average Typo :" value={Math.round(avgTypo)} />
        </Col>
        <Col span={6}>
          <Statistic title="Top Speed (KPM):" value={bestTypeSpeed} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Average Speed (KPM):"
            value={Math.round(avgTypeSpeed)}
          />
        </Col>
      </Row>
      <Row gutter={[0, 48]}>
        <Title level={2}>World Best Korean Typist</Title>
      </Row>
      <Row type="flex" justify="center" gutter={[0, 48]}>
        <Col span={12}>
          <div className="ant-statistic-title">
            Fastest Typist
            <p>한상훈 : 400</p>
            <p>김홍식 : 300</p>
            <p>신동호 : 200</p>
          </div>
        </Col>
        <Col span={12}>
          <div className="ant-statistic-title">
            Most Correct Typist
            <p>한상훈 : 0.2</p>
            <p>김홍식 : 0.3</p>
            <p>신동호 : 0.4</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

//   {
//     "bestTypeSpeed": {
//         "firstUser": "qweqwe",
//         "firstSpeed": 526.1666666666666,
//         "secondUser": "whatup",
//         "secondSpeed": 461.88461538461536,
//         "thirdUser": "newEmail",
//         "thirdSpeed": 353.76566125290026
//     },
//     "bestTypo": {
//         "firstUser": "whatup",
//         "first": 1.3461538461538463,
//         "secondUser": "qweqwe",
//         "second": 2,
//         "thirdUser": "newEmail",
//         "third": 3.02784222737819
//     }
// }
