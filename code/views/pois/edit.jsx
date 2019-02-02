import { Row, Col } from 'antd';
import { WrappedPoiInsertForm } from './form';
import { graphql, compose } from 'react-apollo';
import { UPDATE_POI, FETCH_POI } from 'gql/poi';

class PoiEdit extends React.Component {
  static propTypes = {
    fetchPoi: PropTypes.object
  };

  onSubmit = values => {};

  render() {
    const { fetchPoi } = this.props;
    if (!fetchPoi.pois) {
      return null;
    }
    return (
      <Row>
        <Col>
          <WrappedPoiInsertForm
            poi={fetchPoi.pois[0]}
            onSubmit={this.onSubmit}
          />
        </Col>
      </Row>
    );
  }
}

export default compose(
  graphql(UPDATE_POI, {
    name: 'updatePoi'
  }),
  graphql(FETCH_POI, {
    name: 'fetchPoi',
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  })
)(PoiEdit);
