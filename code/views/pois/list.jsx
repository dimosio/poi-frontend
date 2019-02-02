import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import MultiClamp from 'react-multi-clamp';
import { List, Card } from 'antd';
import { FETCH_POIS } from 'gql/poi';

class PoisList extends React.Component {
  static propTypes = {
    fetchPois: PropTypes.object
  };

  render() {
    const { fetchPois } = this.props;
    if (!fetchPois) {
      return null;
    }
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={fetchPois.pois}
        renderItem={item => (
          <List.Item>
            <Link to={`/poi/${item.id}`}>
              <Card
                hoverable
                cover={<img alt={item.name} src={item.cover_image} />}
              >
                <Card.Meta
                  title={item.name}
                  description={
                    <MultiClamp ellipsis='...' clamp={3}>
                      {item.info_general}
                    </MultiClamp>
                  }
                />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    );
  }
}

export default compose(
  graphql(FETCH_POIS, {
    name: 'fetchPois'
  })
)(PoisList);
