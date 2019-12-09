import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, message, Typography } from 'antd';

const { Title } = Typography;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.userData = {
      username: null,
      image: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('http://3.133.156.53:5000/login', {
          //  3.133.156.53:5000
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then(response => {
            console.log(values);
            return response.json();
          })
          .then(json => {
            message.success('성공적으로 로그인 되었습니다!', 2.5);
            if (json.username) {
              this.props.handleLoginState(json.id, json.username, json.image);
            }
            console.log(json);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{
          padding: 10,
          background: 'white',
          textAlign: 'center',
        }}
      >
        <Form.Item>
          <br />
          <Title level={2}>로그인 화면</Title>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your E-mail!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('pw', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon="poweroff"
            htmlType="submit"
            className="login-form-button"
          >
            로그인
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;
