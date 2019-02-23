import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { WrappedPoiInsertForm } from './form';
import { graphql, compose } from 'react-apollo';
import { UPDATE_POI, FETCH_POI } from 'gql/poi';

class PoiEdit extends React.Component {
  static propTypes = {
    fetchPoi: PropTypes.object,
    updatePoi: PropTypes.func,
    history: PropTypes.object
  };

  onSubmit = values => {
    const { updatePoi, fetchPoi, history } = this.props;
    const {
      name,
      info_general,
      info_history,
      info_architecture,
      info_events,
      info_others,
      info_references,
      website,
      cover_image
    } = values;
    const id = fetchPoi.pois[0].id;
    updatePoi({
      variables: {
        id,
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
        update_pois: {
          __typename: 'pois_mutation_response',
          returning: [
            {
              id,
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
            query: FETCH_POI,
            variables: {
              id
            }
          });
          console.log(stored);


          const newCollection = [
            data.update_pois.returning[0]
          ];
          stored.pois = newCollection;
          store.writeQuery({ query: FETCH_POI, data: stored, variables: { id } });
          console.log(stored);
          history.push('/');
        } catch (e) {
          throw e;
        }
        return null;
      }
    });
  };

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
  withRouter,
  graphql(UPDATE_POI, {
    name: 'updatePoi'
  }),
  graphql(FETCH_POI, {
    name: 'fetchPoi',
    options: props => ({
      variables: {
        id: parseInt(props.match.params.id)
      }
    })
  })
)(PoiEdit);
