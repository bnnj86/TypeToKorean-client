import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Card } from 'antd';
import PracticeData from './PracticeData';
import PracticeScreen from './PracticeScreen';

export default class LongSentencePractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      textToWrite: '소소하지만 확실한 행복.'.normalize('NFD'),
      textToWriteNotNormalized: '소소하지만 확실한 행복.',
      totaltime: 0,
      speed: 0,
      typo: 0,
      score: 0,
      textCountX: 0,
      textCountY: 0,
    };

    this.scoring = this.scoring.bind(this);
    this.postingResult = this.postingResult.bind(this);
    this.getTextToWrite = this.getTextToWrite.bind(this);
  }

  async componentDidMount() {
    console.log('compomentDiDMount on LongSentencePractice');
    await this.getTextToWrite();
    const { data } = this.state;

    this.setState({
      textToWrite: data[0][0].normalize('NFD'),
      textToWriteNotNormalized: data[0][0],
      textCountX: 0,
      textCountY: 1,
    });
  }

  async getTextToWrite() {
    const data = await window.fetch('http://localhost:5000/sample/long');
    const parseData = await data.json();
    this.setState({
      data: parseData,
    });
  }

  async scoring(speed, typo, totaltime) {
    const score = (speed * 100) / ((typo + 1) * 1.3);
    this.postingResult(speed, typo, totaltime, score);

    const { data, textCountX, textCountY } = this.state;

    this.setState({
      textCountY: textCountY + 1,
    });
    if (!data[textCountX][textCountY + 1]) {
      this.setState({
        textCountX: textCountX + 1,
        textCountY: 0,
      });
      if (!data[textCountX + 1]) {
        this.setState({
          textCountX: 0,
          textCountY: 0,
        });
      }
    }

    this.setState({
      totaltime,
      speed,
      typo,
      score,
      textToWrite: data[textCountX][textCountY].normalize('NFD'),
      textToWriteNotNormalized: data[textCountX][textCountY],
    });

    document.querySelector('.inputType').value = null;
    // 점수를 받아서 계산하고, state로 전부 올린다, state에 변경된 데이터 값도 들어간다.
  }

  postingResult(speed, typo, totaltime, score) {
    // 서버로 보내는 부분이 camelCase가 안되있다.
    const { loginId, loginUserName, loginComplete } = this.props;

    const result = {
      typeSpeed: speed,
      score,
      typo,
      totaltime,
    };

    // if (loginComplete) {
    window
      .fetch('http://localhost:5000/typeInformation/id', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .catch(err => console.log(err));
    // }
    // post 요청을 통해 받아온 1 연습 당 데이터를 전송한다.
  }

  render() {
    const {
      textToWrite,
      textToWriteNotNormalized,
      score,
      speed,
      typo,
    } = this.state;

    return (
      <div>
        <Card style={{ marginBottom: 16, marginTop: 16, textAlign: 'center' }}>
          <p>
            <PracticeData
              speed={speed}
              typo={typo}
              score={score}
              style={{ textAlign: 'center' }}
            />
          </p>
          <p>
            <PracticeScreen
              textToWrite={textToWrite}
              scoring={this.scoring}
              postingResult={this.postingResult}
              textToWriteNotNormalized={textToWriteNotNormalized}
              getTextToWrite={this.getTextToWrite}
            />
          </p>
        </Card>
      </div>
    );
  }
}
