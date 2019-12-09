import React, { Component } from 'react';
import { Col, Menu, Layout } from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Main from './pages/Main';
import Long from './pages/Long';
import Custom from './pages/Custom';
import UserInfo from './pages/UserInfo';
import Log from './components/login/Log';
import WrappedRegistrationForm from './pages/WrappedRegistrationForm';
import WrappedSignoutForm from './pages/WrappedSignoutForm';

const { Content, Sider, Card } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginId: '',
      loginUserName: '',
      loginImage: '',
      loginEmail: '',
      loginPhone: '',
      loginComplete: false,
    };

    this.handleLoginState = this.handleLoginState.bind(this);
    this.handleLogoutState = this.handleLogoutState.bind(this);
  }

  componentDidMount() {
    fetch('http://3.133.156.53:5000/logout', {
      //  3.133.156.53:5000
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => {
      this.handleLogoutState();
      return response.json();
    });
  }

  handleLoginState(id, username, image) {
    this.setState({
      loginId: id,
      loginUserName: username,
      loginImage: image,
      loginComplete: true,
    });
  }

  handleLogoutState() {
    this.setState({
      loginComplete: false,
    });
  }

  render() {
    const { loginId, loginUserName, loginComplete, loginImage } = this.state;

    return (
      <div>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Col
              span={19}
              style={{
                background: 'linear-gradient(to right, #3678f1, #ffffff)',
                width: '78vw',
              }}
            >
              <Content style={{ margin: '0 16px' }}>
                <Switch>
                  <Route exact path="/">
                    <Main
                      loginId={loginId}
                      loginUserName={loginUserName}
                      loginComplete={loginComplete}
                    />
                  </Route>
                  <Route path="/long">
                    <Long />
                  </Route>
                  <Route path="/custom">
                    <Custom />
                  </Route>

                  {this.state.loginComplete ? (
                    <Route path="/info">
                      <UserInfo />
                    </Route>
                  ) : (
                    <Route path="/info">
                      <WrappedRegistrationForm />
                    </Route>
                  )}

                  {this.state.loginComplete ? (
                    <Route path="/signin">
                      <UserInfo />
                    </Route>
                  ) : (
                    <Route path="/signin">
                      <WrappedRegistrationForm />
                    </Route>
                  )}

                  <Route path="/signout">
                    <WrappedSignoutForm
                      handleLogoutState={this.handleLogoutState}
                    />
                  </Route>
                </Switch>
              </Content>
            </Col>
            <Col span={5} style={{ background: '#ffffff', width: '22vw' }}>
              <Sider>
                <Log
                  loginId={loginId}
                  loginUserName={loginUserName}
                  loginComplete={loginComplete}
                  loginImage={loginImage}
                  handleLoginState={this.handleLoginState}
                  handleLogoutState={this.handleLogoutState}
                  style={{ width: '22vw' }}
                />
                <Menu
                  onClick={this.handleClick}
                  style={{ width: '22vw', height: '55vh', background: 'white' }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                >
                  <Menu.Item key="1">
                    <Link exact to="/">
                      짧은 글 연습
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/long">긴 글 연습</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/custom">커스텀 글 연습</Link>
                  </Menu.Item>
                  {this.state.loginComplete ? (
                    <Menu.Item key="4">
                      <Link to="/info">회원정보</Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="5">
                      <Link to="/signin">회원가입</Link>
                    </Menu.Item>
                  )}
                  <Menu.Item key="6">Created by Team TypeToKorean</Menu.Item>
                </Menu>
              </Sider>
            </Col>
          </Layout>
        </Router>
      </div>
    );
  }
}
