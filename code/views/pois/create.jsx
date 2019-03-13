import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { WrappedPoiInsertForm } from './form';
import { graphql, compose } from 'react-apollo';
import { INSERT_POI, FETCH_POIS } from 'gql/poi';

class PoiCreate extends React.Component {
  static propTypes = {
    fetchPoi: PropTypes.object,
    insertPoi: PropTypes.func,
    history: PropTypes.object
  };

  onSubmit = values => {
    const { insertPoi, history } = this.props;
    const {
      name,
      info_architecture,
      info_events,
      info_general,
      info_history,
      info_others,
      info_references,
      website,
      cover_image
    } = values;
    insertPoi({
      variables: {
        name,
        info_architecture,
        info_events,
        info_general,
        info_others,
        info_references,
        info_history,
        website,
        cover_image
      },
      optimisticResponse: {
        insert_pois: {
          __typename: 'pois_mutation_response',
          returning: [
            {
              id: null,
              __typename: 'pois',
              name,
              info_architecture,
              info_events,
              info_general,
              info_history,
              info_references,
              info_others,
              website,
              cover_image
            }
          ]
        }
      },
      update: (store, { data }) => {
        try {
          const stored = store.readQuery({
            query: FETCH_POIS
          });
          const newCollection = [
            ...stored.pois,
            ...data.insert_pois.returning[0]
          ];
          stored.pois = newCollection;
          store.writeQuery({ query: FETCH_POIS, data: stored });
          history.push('/');
        } catch (e) {
          throw e;
        }
        return null;
      }
    });
  };

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
  withRouter,
  graphql(INSERT_POI, {
    name: 'insertPoi'
  })
)(PoiCreate);
