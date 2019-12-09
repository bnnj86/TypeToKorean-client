import React, { Component } from 'react';
import { Card } from 'antd';
import PracticeData from './PracticeData';
import PracticeScreen from './PracticeScreen';

export default class ShortSentencePractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      dataEn: '',
      textToRead:
        'Welcome To TypeToKorean! 텍스트를 모두 작성하고 스페이스를 눌러주세요.',
      textToWrite: '소소하지만 확실한 행복.'.normalize('NFD'),
      textToWriteNotNormalized: '소소하지만 확실한 행복.',
      totaltime: 0,
      speed: 0,
      typo: 0,
      score: 0,
      prevSpeed: 0,
      prevTypo: 0,
      prevScore: 0,
      textCountX: 0,
      textCountY: 0,
    };

    this.scoring = this.scoring.bind(this);
    this.postingResult = this.postingResult.bind(this);
    this.getTextToWrite = this.getTextToWrite.bind(this);
    this.getTextToRead = this.getTextToRead.bind(this);
  }

  async componentDidMount() {
    await this.getTextToWrite();
    await this.getTextToRead();
    const { data } = this.state;

    this.setState({
      textToWrite: data[0][0].normalize('NFD'),
      textToWriteNotNormalized: data[0][0],
      textCountX: 1,
      textCountY: 0,
    });
  }

  async getTextToWrite() {
    const data = await window.fetch('http://localhost:5000/sample/short'); // 3.133.156.53:5000
    const parseData = await data.json();
    this.setState({
      data: parseData,
    });
  }

  async getTextToRead() {
    const data = await window.fetch('http://localhost:5000/sample/shortEN'); // 3.133.156.53:5000
    const parseData = await data.json();
    this.setState({
      dataEn: parseData,
      textToRead: parseData[0][0],
    });
  }

  async scoring(speed, typo, totaltime) {
    const { data, dataEn, textCountX, textCountY } = this.state;
    const score = (speed * 100) / ((typo + 1) * 1.3);
    this.setState({
      prevSpeed: speed - this.state.speed,
      prevTypo: typo - this.state.typo,
      prevScore: score - this.state.score,
    });
    this.postingResult(speed, typo, totaltime, score);

    textCountX + 1 < data.length
      ? this.setState({
          textCountX: textCountX + 1,
        })
      : this.setState({
          textCountX: 0,
        });

    this.setState({
      totaltime,
      speed,
      typo,
      score,
      textToRead: dataEn[textCountX][0],
      textToWrite: data[textCountX][0].normalize('NFD'),
      textToWriteNotNormalized: data[textCountX][0],
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

    if (loginComplete) {
      window
        .fetch('http://3.133.156.53:5000typeInformation/id', {
          // 3.133.156.53:5000
          method: 'POST',
          body: JSON.stringify(result),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        .then(res => res.json())
        .catch(err => console.log(err));
    }
    // post 요청을 통해 받아온 1 연습 당 데이터를 전송한다.
  }

  render() {
    const {
      textToRead,
      textToWrite,
      textToWriteNotNormalized,
      score,
      speed,
      typo,
      prevScore,
      prevSpeed,
      prevTypo,
    } = this.state;

    return (
      <div>
        <Card style={{ marginBottom: 16, marginTop: 16, textAlign: 'center' }}>
          <p>
            <PracticeData
              speed={speed}
              typo={typo}
              score={score}
              prevScore={prevScore}
              prevSpeed={prevSpeed}
              prevTypo={prevTypo}
              style={{ textAlign: 'center' }}
            />
          </p>
          <p>
            <PracticeScreen
              textToRead={textToRead}
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
