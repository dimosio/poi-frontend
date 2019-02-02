import { Row, Col } from 'antd';
import { WrappedPoiInsertForm } from './form';
import { graphql, compose } from 'react-apollo';
import { INSERT_POI } from 'gql/poi';

class PoiCreate extends React.Component {
  static propTypes = {
    fetchPoi: PropTypes.object
  };

  onSubmit = values => {};

  render() {
    return (
      <Row>
        <Col>
          <WrappedPoiInsertForm onSubmit={this.onSubmit} />
        </Col>
      </Row>
    );
  }
}

export default compose(
  graphql(INSERT_POI, {
    name: 'insertPoi'
  })
)(PoiCreate);
