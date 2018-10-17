import './App.pcss';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
