import { compose } from 'react-apollo';
import { Form, Input, Button } from 'antd';

import { fetchUserToProps } from '../../utils';

class AccountInfo extends React.Component {
  static propTypes = {
    form: PropTypes.object
  };

  render() {
    console.info(this.props);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
            rules: [
              {
                required: true,
                message: 'Please input your password'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Repeat password</span>}>
          {getFieldDecorator('repeat-password', {
            rules: [
              {
                required: true,
                message: 'Please input your password'
              }
            ]
          })(<Input />)}
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

export default compose(fetchUserToProps())(
  Form.create({ name: 'poi_insert' })(AccountInfo)
);
