import React, { Component } from 'react';
import CustomTextPractice from '../components/practice/CustomTextPractice';
import ReadMe from './ReadMe';

export default class Custom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>
          <CustomTextPractice />
        </p>
        <p>
          <ReadMe />
        </p>
      </div>
    );
  }
}
