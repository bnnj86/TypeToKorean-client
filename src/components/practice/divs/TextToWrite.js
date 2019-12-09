import React from 'react';
import { Card } from 'antd';

export default function TypoDiv({ textToWrite }) {
  return (
    <Card style={{ fontSize: 21 }} className="textToWrite">
      {textToWrite}
    </Card>
  );
}
