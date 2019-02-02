import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

class PoiInsertForm extends React.Component {
  static propTypes = {
    form: PropTypes.object
  };

  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
        <Form.Item {...formItemLayout} label='Name'>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: "Please input the POI's name"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>General</span>}>
          {getFieldDecorator('info_general')(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Architecture</span>}>
          {getFieldDecorator('info_general')(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>History</span>}>
          {getFieldDecorator('info_history')(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Events</span>}>
          {getFieldDecorator('info_events')(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Others</span>}>
          {getFieldDecorator('info_others')(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>References</span>}>
          {getFieldDecorator('info_references')(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Website</span>}>
          {getFieldDecorator('website')(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedPoiInsertForm = Form.create({ name: 'poi_insert' })(
  PoiInsertForm
);
