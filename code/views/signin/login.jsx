import { Icon, Form, Input, Button } from 'antd';

class LoginForm extends React.Component {
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
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'Please input your username'
              }
            ]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username or password'
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'Please input your password'
              }
            ]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Password'
              type='password'
            />
          )}
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedLoginForm = Form.create({ name: 'user_login' })(LoginForm);
