import { compose } from 'react-apollo';
import { Form, Input, Button } from 'antd';

import { fetchUserToProps } from '../../utils';


import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
class Signup extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    user: PropTypes.object
  };

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;
    // if (!loggedInUser.users) {
    //   return null;
    // }
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

export default compose(fetchUserToProps())(
  Form.create({ name: 'signup_info' })(Signup)
);
