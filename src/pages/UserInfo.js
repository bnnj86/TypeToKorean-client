import React, { Component } from 'react';
import { Card } from 'antd';
import BriefInfo from '../components/userInfo/BriefInfo';
import Stat1 from '../components/userInfo/Stat1';
import Stat2 from '../components/userInfo/Stat2';
import Stat1Warpper from '../components/userInfo/Stat1Warpper';
import Stat2Warpper from '../components/userInfo/Stat2Warpper';

const WarppedStat2 = Stat2Warpper(Stat2);
const WarppedStat1 = Stat1Warpper(Stat1);

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserInfoIsLoading: false,
      BestInfoIsLoading: true,
      data: [],
      bestData: {},
      briefInfo: '',
    };

    this.getStat1 = this.getStat1.bind(this);
    this.getStat2 = this.getStat2.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.miliSecondsToTime = this.miliSecondsToTime.bind(this);
    this.getBestUser = this.getBestUser.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({
        UserInfoIsLoading: true,
        BestInfoIsLoading: true,
      });
      this.setState({
        UserInfoIsLoading: false,
        data: await this.getStat2(),
      });
      await this.getStat1();
      this.setState({
        BestInfoIsLoading: false,
        bestData: await this.getBestUser(),
      });
      console.log(this.state.bestData);
    } catch (error) {
      console.log('userInfo.js componentDidMount error', error);
    }
    // window.setInterval(() => {
    //   this.setState({
    //     data: this.getStat2(),
    //   });
    //   console.log('setInterval worked');
    // }, 5000);
  }

  async getStat1() {
    const data = await window.fetch('http://localhost:5000/profile', {
      //  3.133.156.53:5000
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }); // 3.133.156.53:5000
    const fetchedData = await data.json();
    this.setState({
      briefInfo: fetchedData,
    });
    console.log('fetchedData stat1', fetchedData.username);
  }

  async getStat2() {
    const data = await window.fetch('http://localhost:5000/statistics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }); // 3.133.156.53:5000
    const fetchedData = await data.json();
    this.setState({
      data: fetchedData,
    });

    const countedNames = fetchedData.reduce(function(allDatas, data) {
      const typeSpeed10 = Math.round(data.typeSpeed / 10) * 10;
      if (typeSpeed10 in allDatas) {
        allDatas[typeSpeed10] += 1;
      } else {
        allDatas[typeSpeed10] = 1;
      }
      return allDatas;
    }, {});

    this.result = [];
    for (const key in countedNames) {
      this.result.push({
        label: key,
        value: countedNames[key],
      });
    }

    return this.result;
  }

  async getBestUser() {
    const data = await window.fetch('http://localhost:5000/getBestUser'); // 3.133.156.53:5000
    const fetchedData = await data.json();
    this.setState({
      bestData: fetchedData,
    });
  }

  getUserInfo() {
    fetch('http://localhost:5000/users/id') // 3.133.156.53:5000
      .then(res => res.json())
      .then(json => {
        this.setState({
          userInfo: json,
        });
      });
  }

  miliSecondsToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${Math.round(seconds)}`;
  }

  render() {
    const {
      data,
      UserInfoIsLoading,
      briefInfo,
      bestData,
      BestInfoIsLoading,
    } = this.state;
    return (
      <Card style={{ marginBottom: 16, marginTop: 16 }}>
        <BriefInfo
          username={briefInfo.username}
          email={briefInfo.email}
          phone={briefInfo.phone}
        />
        <br />
        <br />
        <WarppedStat1
          BestInfoIsLoading={BestInfoIsLoading}
          totalTime={this.miliSecondsToTime(briefInfo.totalTime)}
          totalScore={briefInfo.totalScore}
          avgTypeSpeed={Math.round(briefInfo.avgTypeSpeed)}
          bestTypeSpeed={briefInfo.bestTypeSpeed}
          totalTypo={briefInfo.total}
          avgTypo={briefInfo.avgTypo}
          bestData={bestData}
        />
        <br />
        <br />
        <WarppedStat2
          data={data}
          UserInfoIsLoading={UserInfoIsLoading}
          avgTypeSpeed={Math.round(briefInfo.avgTypeSpeed)}
          bestTypeSpeed={briefInfo.bestTypeSpeed}
          title="Typing Korean, You vs. World"
          color="#70CAD1"
        />
      </Card>
    );
  }
}

export default UserInfo;
