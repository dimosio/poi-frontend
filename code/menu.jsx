import { Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.alipay.com/'
      >
        Account
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.taobao.com/'
      >
        Provide Feedback
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='http://www.tmall.com/'>
        About us
      </a>
    </Menu.Item>
  </Menu>
);

export default class AppMenu extends React.Component {
  render() {
    return (
      <Dropdown className='menu' overlay={menu}>
        <div>Information</div>
      </Dropdown>
    );
  }
}
