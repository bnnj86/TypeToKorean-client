import React, { Component } from 'react';
import OneSentencePractice from '../components/practice/ShortSentencePractice';
import ReadMe from './ReadMe';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loginId, loginUserName, loginComplete } = this.props;

    return (
      <div>
        <p>
          <OneSentencePractice
            loginId={loginId}
            loginUserName={loginUserName}
            loginComplete={loginComplete}
          />
        </p>
        <p>
          <ReadMe />
        </p>
      </div>
    );
  }
}
