import React from 'react';
import { Statistic, Row, Col, Button } from 'antd';

export default function ScoreDiv({ score, prevScore }) {
  return (
    <Row>
      <Col>
        <Statistic title="Score" value={Math.round(score)} />
      </Col>
      <Col>
        <Statistic title="Gain" value={Math.round(prevScore)} />
      </Col>
    </Row>
  );
}
