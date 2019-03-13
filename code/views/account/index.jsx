import { Form, Input, Button } from 'antd';

class AccountInfo extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    loggedInUser: PropTypes.object
  };

  render() {
    const { loggedInUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (!loggedInUser.users) {
      return null;
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const user = loggedInUser.users[0];
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label={<span>Username</span>}>
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [
              {
                required: true,
                message: 'Please input your username'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Email</span>}>
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [
              {
                required: true,
                message: 'Please input your email'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Password</span>}>
          {getFieldDecorator('password', {
            initialValue: user.password,
            rules: [
              {
                required: true,
                message: 'Please input your password'
              }
            ]
          })(<Input type='password' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Repeat password</span>}>
          {getFieldDecorator('repeat-password', {
            initialValue: user.password,
            rules: [
              {
                required: true,
                message: 'Please input your password'
              }
            ]
          })(<Input type='password' />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'account_info' })(AccountInfo);
