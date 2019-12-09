import React, { Component } from 'react';
import { Row, Col } from 'antd';
import SpeedDiv from './divs/SpeedDiv';
import TypoDiv from './divs/TypoDiv';
import ScoreDiv from './divs/ScoreDiv';

export default class PracticeData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { speed, typo, score, prevSpeed, prevTypo, prevScore } = this.props;
    return (
      <Row>
        <Col span={8}>
          <SpeedDiv speed={speed} prevSpeed={prevSpeed} />
        </Col>
        <Col span={8}>
          <TypoDiv typo={typo} prevTypo={prevTypo} />
        </Col>
        <Col span={8}>
          <ScoreDiv score={score} prevScore={prevScore} />
        </Col>
      </Row>
    );
  }
}
