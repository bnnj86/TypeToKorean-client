import React from 'react';
import { Form, Button, Avatar, Typography, message } from 'antd';

const { Title } = Typography;

class LoginRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      iconLoading: false,
    };
  }

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  logoutButton = () => {
    fetch('http://3.133.156.53:5000/logout', {
      //  3.133.156.53:5000
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => {
      message.success('성공적으로 로그아웃 되었습니다!', 2.5);
      this.props.handleLogoutState();
      return response.json();
    });
  };

  render() {
    return (
      <div
        style={{
          padding: 10,
          background: 'white',
          textAlign: 'center',
        }}
      >
        <Form.Item>
          <br />
          <Title level={2}>간단한 유저 정보</Title>
        </Form.Item>
        <div>
          {this.props.loginImage ? (
            <Avatar shape="square" size={64} icon={this.props.loginImage} />
          ) : (
            <Avatar shape="square" size={64} icon="close" />
          )}
        </div>
        <br />
        <div>
          {this.props.loginUserName ? (
            <Title level={4}>Username : {this.props.loginUserName}</Title>
          ) : (
            <Title level={4}>Username : something wrong!</Title>
          )}
        </div>
        <br />
        <div>
          <Button
            type="primary"
            icon="poweroff"
            loading={this.state.iconLoading}
            onClick={
              (this.enterIconLoading,
              () => {
                this.logoutButton();
              })
            }
          >
            로그아웃
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginRender;
