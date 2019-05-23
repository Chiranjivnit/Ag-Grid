import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { connect } from "react-redux";

class Leaflet extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505, // lat:[]
      lng: -0.09, // lan:[]
      zoom: 13 // zoom:[]
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      leafletData,
      leafletData: { lat, lng, zoom }
    } = nextProps;
    if (leafletData !== this.props.leafletData) {
      this.setState({
        lat,
        lng,
        zoom
      });
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div id="mapid" style={{ height: "180px" }}>
        <Map
          center={position}
          zoom={this.state.zoom}
          style={{ overflow: "hidden", height: "200%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leafletData: state.AgGridReducer.leafletData
  };
};
export default connect(
  mapStateToProps,
  null
)(Leaflet);
