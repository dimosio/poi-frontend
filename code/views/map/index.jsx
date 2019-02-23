import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

export default class Map extends Component {
  state = {
    lat: 40.634796,
    lng: 22.948409,
    zoom: 15
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap
        style={{ height: '100vh' }}
        center={position}
        zoom={this.state.zoom}
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}
