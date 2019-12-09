import React from 'react';
import { Statistic, Row, Col, Button } from 'antd';

export default function TypoDiv({ typo, prevTypo }) {
  return (
    <Row>
      <Col>
        <Statistic title="Typo" value={typo} />
      </Col>
      <Col>
        <Statistic title="Gain" value={prevTypo} />
      </Col>
    </Row>
  );
}
