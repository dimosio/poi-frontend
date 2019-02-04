import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

class PoiInsertForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    poi: PropTypes.object,
    onSubmit: PropTypes.func
  };

  state = {
    confirmDirty: false
  };

  static defaultProps = {
    poi: {
      id: null,
      name: '',
      info_general: '',
      info_events: '',
      info_history: '',
      info_others: '',
      info_references: '',
      website: '',
      cover_image: ''
    }
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

    const { poi } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label='Name'>
          {getFieldDecorator('name', {
            initialValue: poi.name,
            rules: [
              {
                required: true,
                message: "Please input the POI's name"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>General</span>}>
          {getFieldDecorator('info_general', {
            initialValue: poi.info_general
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Architecture</span>}>
          {getFieldDecorator('info_architecture', {
            initialValue: poi.info_architecture
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>History</span>}>
          {getFieldDecorator('info_history', {
            initialValue: poi.info_history
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Events</span>}>
          {getFieldDecorator('info_events', {
            initialValue: poi.info_events
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Others</span>}>
          {getFieldDecorator('info_others', {
            initialValue: poi.info_others
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>References</span>}>
          {getFieldDecorator('info_references', {
            initialValue: poi.info_references
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Website</span>}>
          {getFieldDecorator('website', {
            initialValue: poi.website
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Cover image</span>}>
          {getFieldDecorator('cover_image', {
            initialValue: poi.cover_image
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            {poi.id ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedPoiInsertForm = Form.create({ name: 'poi_insert' })(
  PoiInsertForm
);
