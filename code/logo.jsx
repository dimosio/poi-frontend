import logo from './assets/dimosio.png';

export default class AppLogo extends React.Component {
  render() {
    return (
      <div className='logo'>
        <img src={logo} alt='dimos.io' />
      </div>
    );
  }
}
