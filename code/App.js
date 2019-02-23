import './App.less';
import Menu from './menu';
import Logo from './logo';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Menu />
        <Logo />
        {children}
      </React.Fragment>
    );
  }
}
