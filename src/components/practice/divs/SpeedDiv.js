import React from 'react';
import { Statistic, Row, Col, Button } from 'antd';

export default function SpeedDiv({ speed, prevSpeed }) {
  return (
    <Row>
      <Col>
        <Statistic title="Speed" value={Math.round(speed)} />
      </Col>
      <Col>
        <Statistic title="Gain" value={Math.round(prevSpeed)} />
      </Col>
    </Row>
  );
}
