import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { Link, Element } from 'react-scroll';
import { Row, Col, Modal } from 'antd';
import closeIcon from '../../assets/close-icon.png';
import { FETCH_POI } from 'gql/poi';
import QRCode from 'qrcode';

import './view.less';

class PoiView extends React.Component {
  static propTypes = {
    fetchPoi: PropTypes.object,
    history: PropTypes.object
  };

  state = {
    qrCode: null,
    visible: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchPoi.pois) {
      QRCode.toDataURL(nextProps.fetchPoi.pois[0].id.toString(), (err, url) => {
        this.setState({ qrCode: url });
      });
    }
  }

  onEditClick = () => {};

  render() {
    const { qrCode } = this.state;
    const { fetchPoi, history } = this.props;
    if (!fetchPoi.pois) {
      return null;
    }
    const poi = fetchPoi.pois[0];
    return (
      <div>
        <div className='poi__close' onClick={() => history.push('/')}>
          <img src={closeIcon} alt='close-icon' />
        </div>
        <div
          style={{
            backgroundImage: `url("${poi.cover_image}")`
          }}
          className='poi__cover'
        >
          <div className='poi__cover-gradient' />
          <div className='poi__intro'>
            <h1>{poi.name}</h1>
            <p>{poi.info_general}</p>
            <div className='poi__menu'>
              <Link to='architecture' smooth offset={50} duration={500}>
                Αρχιτεκτονική
              </Link>
              <Link to='architecture' smooth offset={50} duration={500}>
                Ιστορία
              </Link>
              <Link to='events' smooth offset={50} duration={500}>
                Events
              </Link>
            </div>
          </div>
        </div>
        <div className='poi__overlay'>
          <div className='poi__content'>
            {/* <Row type='flex' justify='space-between' align='middle'>
              <Col span={12} offset={6}>
                <Button.Group>
                  <Button
                    icon='edit'
                    onClick={() => history.push(`/poi/${poi.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    icon='qrcode'
                    onClick={() => this.setState({ visible: true })}
                  >
                    QR Code
                  </Button>
                </Button.Group>
              </Col>
            </Row> */}
            {poi.info_general && (
              <Row>
                <Col xs={{ span:18, offset: 2}} span={12} offset={6}>
                  <h3 id='general'>Γενικές Πληροφορίες</h3>
                  <p>
                    <span>{poi.info_general}</span>
                  </p>
                </Col>
              </Row>
            )}
            {poi.history && (
              <Row>
                <Col span={12} offset={6}>
                  <h3 id='history'>Ιστορία</h3>
                  <p>
                    <span>{poi.history}</span>
                  </p>
                </Col>
              </Row>
            )}
            {poi.info_architecture && (
              <Row>
                <Col span={12} offset={6}>
                  <Element name='architecture'>
                    <h3>Αρχιτεκτονική</h3>
                    <p>{poi.info_architecture}</p>
                  </Element>
                </Col>
              </Row>
            )}
            {poi.info_events && (
              <Row>
                <Col span={12} offset={6}>
                  <h3 id='events'>Events</h3>
                  <p>{poi.info_events}</p>
                </Col>
              </Row>
            )}
            {poi.info_others && (
              <Row>
                <Col span={12} offset={6}>
                  <h3>Other info</h3>
                  <p>{poi.info_others}</p>
                </Col>
              </Row>
            )}
            {poi.info_others && (
              <Row>
                <Col span={12} offset={6}>
                  <h3>Other info</h3>
                  <p>{poi.info_others}</p>
                </Col>
              </Row>
            )}
          </div>
        </div>
        <Modal
          title=''
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
        >
          <img style={{ width: '100%' }} src={qrCode} alt={poi.name} />
        </Modal>
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(FETCH_POI, {
    name: 'fetchPoi',
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  })
)(PoiView);
