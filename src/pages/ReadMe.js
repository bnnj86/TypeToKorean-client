import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';

export default class ReadMe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card title="타자 연습을 통한 한국어 공부">
          <p>
            Thank you for choosing our Hangul Education Project, TypeToKorea.
            You will learn how to type Korean here. However, it's not only about
            learning Hangul Typing, but also about learning basic Korean
            naturally and intuitively via Hangul Typing. Don't Learn Koean by
            Textbook in boring way! We, TypeToKorean will be responsoble to let
            you understand Korean!
          </p>
          <p>
            여러분은 앞으로 Type To Korean 에서 한국어 타자연습을 진행하게
            됩니다. 한국어 타자연습은 여러분의 타자연습 뿐 아니라, 한국어를
            공부하게 됩니다. Type To Korean과 함께 기존 지루한 암기식 언어
            공부에서 벗어나서 다양한 한국어 컨텐츠와 함께 공부할까요?
          </p>
        </Card>
        <Card title="Touch Typing은 무엇인가요?">
          <p>
            Touch typing is the ability to use muscle memory to find keys fast,
            without using the sense of sight, and with all the available
            fingers, just like piano players do. It significantly improves
            typing speed and eliminates errors. Touch typing simply makes you
            more productive and it is a skill worth learning.
          </p>
          <p>
            Touch typing은 열 손가락을 모두 사용하여 손가락 근육의 기억 능력을
            기반으로 시각에 의존하지 않은 타이핑 방식입니다. 마치 피아노를 치는
            기분을 느끼실 수 있습니다. Touch typing은 타자 속도를 향상시키고
            오타를 최소화 함으로써 여러분의 업무 효율을 극대화할 수 있는
            도구입니다.
          </p>
        </Card>
        <Card title="한국어 공부에 도움이 되나요?">
          <p>
            Yes, You will learn how to type in Korean, however, this will let
            you concentrate on Korean text. This will naturally let you read
            Korean better. We will provide the best Korean text for you to learn
            Korea. Also, you could use your custom text to practice typing Korea
            too. Soon, there will be major updates. You will put your favourate
            K-Pop YouTube Video here, and practice to type their beautiful
            lyrics. you could get better score if you get to write as fast as
            they sing!
          </p>
          <p>
            네, 도움이 됩니다! 여러분은 여기서 한국어 타자 능력을 1차적으로
            향상시키지만, 자연스럽게 한국어를 많이 읽게 됩니다. 타자를 치기
            위해서는 한국어 독해에 집중하셔야 해서 한국어의 문법과 구조를
            무의식적으로 파악하시게 될 것입니다. 또한 여러분이 연습하고 싶은
            한국어 텍스트를 저희 타자연습 프로그램에서 하실 수 있습니다. 당신이
            가장 좋아하는 K-Pop 유튜브 비디오를 불러와서 가사를 치며 연습할 수
            있는 기능이 곧 업데이트 예정입니다. 아름다운 가사를 가수보다 더 빨리
            치실 수 있다면 더 높은 점수를 받을 수 있습니다 !
          </p>
        </Card>
        <Card title="연습 데이터는 어떻게 제공받나요?">
          <p>
            We also collect your Korean typing practice data which will be
            custmozied for you, and gives you better typing practice, which not
            only helps you to reduce Korean typo, but also helps you to learn
            Koreans too. Our Korean texts are well-curated for forginers to
            learn basic Korean grammer and context as soon as possible. All of
            developers are native Koreans, who will be happy to provide the best
            Korean text all the time for you.
          </p>
          <p>
            Type To Korean은 여러분의 타자 데이터를 축적하여 개인에게 가장
            적합한 타자 연습 솔루션을 제공할 예정입니다. 한국어 타자의 오타를
            줄일 뿐만 아니라, 한국어를 배우는데도 도움이 되는 텍스트를
            준비했습니다. 특히 한국어를 모국어로 하지 않는 외국인이 배우기에
            최적화되어 있습니다. Type To Korean의 모든 개발자들은 자랑스러운
            한국인으로써 아름답고 자연스러운 한국어 문장을 제공하기 위해 최신
            데이터 분석 기술과 개발 스텍을 사용하여 홈페이지를 제작했습니다.
          </p>
          <p>
            More updates comming soon, keep typing!! 앞으로 더 많은 업데이트가
            있을 예정이니, 자주 찾아주세요!!
          </p>
        </Card>
      </div>
    );
  }
}
