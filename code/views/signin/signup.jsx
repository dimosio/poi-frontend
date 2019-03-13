import { Form, Input, Button } from 'antd';

class SignupForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    user: PropTypes.object,
    onSubmit: PropTypes.func
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      onSubmit(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label={<span>Username</span>}>
          {getFieldDecorator('username', {
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'Please repeat your password'
              }
            ]
          })(<Input type='password' />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Create account
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedSignupForm = Form.create({ name: 'user_insert' })(
  SignupForm
);
