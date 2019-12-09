import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
  Typography,
  Card,
} from 'antd';

const { Option } = Select;
const { Title } = Typography;
const AutoCompleteOption = AutoComplete.Option;

class SignoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmDirty: false, autoCompleteResult: [] };
  }

  /* state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }; */

  handleSubmit = e => {
    const { form, handleLogoutState } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.created_at = String(new Date());
        fetch('http://3.133.156.53:5000/signout', {
          // 3.133.156.53:5000
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then(response => {
            return response.json();
          })
          .then(json => {
            if (!json) {
              message.error('회원탈퇴에 실패하였습니다.', 3);
            } else {
              message.success('성공적으로 회원탈퇴가 완료되었습니다.', 3);
              handleLogoutState();
              console.log(json);
            }
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Card style={{ marginBottom: 16, marginTop: 16, textAlign: 'center' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          E-mail과 비밀번호를 입력하면 회원탈퇴가 완료됩니다.
        </Title>
        <Row type="flex" justify="center">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('pw', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Signout
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Card>
    );
  }
}

const WrappedSignoutForm = Form.create({ name: 'register' })(SignoutForm);

export default WrappedSignoutForm;
