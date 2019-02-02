import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';
import { Button, Card, Row, Col } from 'antd';

class Contribute extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  render() {
    const { history } = this.props;
    return (
      <Row type='flex' justify='space-around' align='middle'>
        <Col>
          <Card title='Create a POI' bordered={false} style={{ width: 500 }}>
            <p>
              Create your POI, print the QR code and post it on a wall to make
              the information available to people
            </p>
            <Button type='primary' onClick={() => history.push('/poi/create')}>
              Lets go
            </Button>
          </Card>
        </Col>
        <Col>
          <Card
            title='We need your feedback!'
            bordered={false}
            style={{ width: 300 }}
          >
            <p>
              Not only feedback but new ideas too, join our team on{' '}
              <a href=''>slack</a>
            </p>
            <Button>Get your invitation</Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default compose(withRouter)(Contribute);
