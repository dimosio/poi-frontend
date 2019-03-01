import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as L from 'leaflet';
import React, { Component } from 'react';
import MapBoxGLLayer from '../../mapbox';
import { Map as LeafletMap, Marker, Popup } from 'react-leaflet';
import { Card } from 'antd';
import { FETCH_POIS } from 'gql/poi';
import pin from '../../assets/pin.png';
import './style.less';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoic3RlZm9yb3ZhcyIsImEiOiJjaXd0aWVtajYwMDEzMm9reTk5c2ZwZm11In0.MUR4ozZ5d1I_oHE3APDjrw';

const pinIcon = L.icon({
  iconUrl: pin,
  iconSize: [32, 32], // size of the icon
  shadowSize: [100, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

class Map extends Component {
  static propTypes = {
    fetchPois: PropTypes.object
  };

  state = {
    lat: 40.634796,
    lng: 22.948409,
    zoom: 15
  };

  render() {
    const { fetchPois } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap
        style={{ height: '100vh' }}
        center={position}
        zoom={this.state.zoom}
        zoomControl={false}
      >
        <MapBoxGLLayer
          accessToken={MAPBOX_ACCESS_TOKEN}
          style='mapbox://styles/steforovas/cjspbgcyb1uv71fmstjk89zop'
        />
        {fetchPois.pois &&
          !fetchPois.loading &&
          fetchPois.pois.map(poi => (
            <Marker icon={pinIcon} position={poi.location.coordinates}>
              <Popup className='map__popup'>
                <Card
                  className='map__popup-card'
                  bordered={false}
                  cover={<img alt={poi.name} src={poi.cover_image} />}
                >
                  <Card.Meta
                    title={poi.name}
                    description={<Link to={`/poi/${poi.id}`}>Read more</Link>}
                  />
                </Card>
              </Popup>
            </Marker>
          ))}
      </LeafletMap>
    );
  }
}

export default compose(
  graphql(FETCH_POIS, {
    name: 'fetchPois'
  })
)(Map);
