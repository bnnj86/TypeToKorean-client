import React from 'react';
import { Input } from 'antd';

export default class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speedStart: 0,
      infoMsg:
        'Welcome To TypeToKorean! 텍스트를 모두 작성하고 스페이스를 눌러주세요.',
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
    this.checkTypo = this.checkTypo.bind(this);
  }

  componentDidMount() {
    const { textToRead } = this.props;
    // setTimeout(
    //   this.setState({
    //     infoMsg: textToRead,
    //   }),
    //   1000,
    // );
  }

  handleEvent(event) {
    const inputTypeNotNormalized = document.querySelector('.inputType').value;

    if (event.which === 27) {
      this.setState({
        speedStart: 0,
      });
      document.querySelector('.inputType').value = null;
    }

    if (event.type === 'keydown') {
      if (inputTypeNotNormalized.length === 1) {
        const speedStart = event.timeStamp;
        this.setState({
          speedStart,
        });
      }
    }
  }

  handleSpace(event) {
    event.persist();
    const { speedStart } = this.state;
    const { textToWrite, textToWriteNotNormalized, scoring } = this.props;
    const inputTypeNotNormalized = document.querySelector('.inputType').value;

    if (textToWriteNotNormalized.length + 1 === inputTypeNotNormalized.length) {
      const totalTime = event.timeStamp - speedStart;

      const KPM = textToWrite.length * (60000 / totalTime); // 속도 계산

      // 여기서 오타 잡는 함수 실행
      const newTypo = this.checkTypo(
        textToWriteNotNormalized,
        inputTypeNotNormalized,
      );

      scoring(KPM, newTypo, totalTime);

      if (newTypo / inputTypeNotNormalized.length > 0.5) {
        this.setState({
          speedStart: 0,
          infoMsg: '오타율이 50% 이상이면 데이터를 기록하지 않습니다.',
        });
        return '오타율이 50% 이상이면 데이터를 기록하지 않습니다.';
      }

      if (event.which === 13 || event.which === 32) {
        console.log('enter, space working');
        document.querySelector('.inputType').value = null;
        // 점수 state로 올릴 때도 지워주자
        this.setState({
          speedStart: 0,
          infoMsg: '잘하셨어요, keep going!',
        });
        return '잘하셨어요, keep going!';
      }

      if (
        textToWriteNotNormalized.length + 2 === inputTypeNotNormalized.length ||
        textToWriteNotNormalized.length + 3 === inputTypeNotNormalized.length
      ) {
        this.setState({
          speedStart: 0,
          infoMsg:
            '모두 다 작성을 하시고 스페이스를 눌러주세요 ! 다른 키를 누르면 오타가 증가됩니다.',
        });
        return '모두 다 작성을 하시고 스페이스를 눌러주세요 ! 다른 키를 누르면 오타가 증가됩니다.';
      }
      // console.log('TypoCount', typo);
      // console.log('KPM', KPM);
      // console.log('inputLength', inputLength);
      // console.log('speed', speedCheckArray);
      // console.log('inputType', inputTypeNotNormalized);
      return 'sth wrong';
    }
  }

  checkTypo(text, input) {
    let result = 0;
    for (let i = 0; i < input.length - 1; i += 1) {
      if (text[i] !== input[i]) {
        result += 1;
      }
    }
    return result;
  }

  render() {
    const { infoMsg } = this.state;
    const { textToRead } = this.props;

    return (
      <div>
        <div className="control">
          <div
            className="ant-card-bordered"
            style={{
              height: 'auto',
              lineHeight: 'normal',
              padding: '.8em .5em',
            }}
          >
            {textToRead || infoMsg}
          </div>
          <div>
            <input
              style={{
                width: '100%',
                height: '5vh',
                padding: '.8em .5em',
              }}
              className="ant-input inputType"
              placeholder="이곳에서 한글 타자 연습을 시작하세요!"
              onKeyDown={this.handleEvent}
              onKeyUp={this.handleSpace}
            />
          </div>
        </div>
      </div>
    );
  }
}
