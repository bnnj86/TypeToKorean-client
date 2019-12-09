import React, { Component } from 'react';
import LongSentencePractice from '../components/practice/LongSentencePractice';
import ReadMe from './ReadMe';

export default class Long extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>
          <LongSentencePractice />
        </p>
        <p>
          <ReadMe />
        </p>
      </div>
    );
  }
}
