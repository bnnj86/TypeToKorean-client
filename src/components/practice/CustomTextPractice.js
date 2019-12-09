import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Card, Input } from 'antd';
import PracticeData from './PracticeData';
import PracticeScreen from './PracticeScreen';

export default class CustomSentencePractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      textToWrite: '커스텀 텍스트를 작성해주세요!'.normalize('NFD').trim(),
      textToWriteNotNormalized: '커스텀 텍스트를 작성해주세요!'.trim(),
      speed: 0,
      typo: 0,
      score: 0,
      textCountX: 0,
      textCountY: 0,
    };

    this.scoring = this.scoring.bind(this);
    this.postingResult = this.postingResult.bind(this);
    this.submitCustomText = this.submitCustomText.bind(this);
  }

  async componentDidMount() {
    this.setState({
      textCountX: 0,
      textCountY: 1,
    });
  }

  async scoring(speed, typo, totaltime) {
    const score = (speed * 100) / ((typo + 1) * 1.3);
    this.postingResult(speed, typo, totaltime, score);

    const { data, textCountX, textCountY } = this.state;

    textCountY + 1 < data[0].length
      ? this.setState({
          textCountY: textCountY + 1,
        })
      : this.setState({
          textCountY: 0,
        });

    // if (!data[0][newcount]) {
    //   this.setState({
    //     textCountY: 0,
    //   });
    // } else {
    //   this.setState({
    //     textCountY: newcount,
    //   });
    // }

    this.setState({
      totaltime,
      speed,
      typo,
      score,
      textToWrite: data[0][textCountY].normalize('NFD').trim(),
      textToWriteNotNormalized: data[0][textCountY].trim(),
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
        .fetch('http://3.133.156.53:5000/typeInformation/id', {
          //  3.133.156.53:5000
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

  submitCustomText(value) {
    // if (value.length > 40){
    const resultArray = [];
    const newArray = [];
    for (let i = 0; i < value.length; i += 40) {
      newArray.push(value.slice(i, i + 40).trim());
    }
    resultArray.push(newArray);

    this.setState({
      data: resultArray,
      textToWrite: resultArray[0][0].normalize('NFD').trim(),
      textToWriteNotNormalized: resultArray[0][0].trim(),
    });
  } // CustomText 등록

  render() {
    const {
      textToWrite,
      textToWriteNotNormalized,
      score,
      speed,
      typo,
    } = this.state;
    const { Search } = Input;

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
          <Search
            style={{
              width: '100%',
              height: '10vh',
              marginTop: '10px',
            }}
            placeholder="여기에 커스텀 텍스트를 작성하세요"
            enterButton="Enter"
            size="large"
            onSearch={value => this.submitCustomText(value)}
          />
        </Card>
      </div>
    );
  }
}
