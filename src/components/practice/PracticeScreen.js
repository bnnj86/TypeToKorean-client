import React, { Component } from 'react';
import { Card } from 'antd';

import TextToWrite from './divs/TextToWrite';
import InputText from './divs/InputText';

export default class PracticeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      textToWrite,
      scoring,
      postingResult,
      textToWriteNotNormalized,
      getTextToWrite,
      textToRead,
    } = this.props;
    return (
      <Card>
        <TextToWrite textToWrite={textToWrite} />

        <InputText
          textToRead={textToRead}
          textToWrite={textToWrite}
          scoring={scoring}
          postingResult={postingResult}
          textToWriteNotNormalized={textToWriteNotNormalized}
          getTextToWrite={getTextToWrite}
        />
      </Card>
    );
  }
}
