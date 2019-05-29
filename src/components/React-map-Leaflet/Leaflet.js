import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { connect } from "react-redux";

class Leaflet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: [],
      price: [],
      make: [],
      lat: 51.505, // lat:[]
      lng: -0.09, // lan:[]
      zoom: 8,
      leafletData: [] // zoom:[]
    };
  }

  getMinLng = () => {
    return this.state.leafletData.length !== 0
      ? this.state.leafletData.reduce(
          (min, p) => (p.lng < min ? p.lng : min),
          this.state.leafletData[0].lng
        )
      : 0;
  };
  getMaxLng = () => {
    return this.state.leafletData.length !== 0
      ? this.state.leafletData.reduce(
          (max, p) => (p.lng > max ? p.lng : max),
          this.state.leafletData[0].lng
        )
      : 0;
  };
  getMinLat = () => {
    return this.state.leafletData.length !== 0
      ? this.state.leafletData.reduce(
          (min, p) => (p.lat < min ? p.lat : min),
          this.state.leafletData[0].lat
        )
      : 0;
  };
  getMaxLat = () => {
    return this.state.leafletData.length !== 0
      ? this.state.leafletData.reduce(
          (max, p) => (p.lat > max ? p.lat : max),
          this.state.leafletData[0].lat
        )
      : 0;
  };

  componentWillReceiveProps(nextProps) {
    const { leafletData } = nextProps;
    if (leafletData !== this.props.leafletData) {
      this.setState({
        leafletData
      });
    }
  }

  renderMap = leafletData => {
    return leafletData.map(item => {
      const position = [item.lat, item.lng];
      return (
        <Marker position={position} key={item.price}>
          <Popup>
            welcome
            <strong style={{ textSizeAdjust: "80%" }}>
              {item.make} {item.model}
            </strong>
            DreamzsCar <br /> check out price
            <strong>{item.price}</strong> for your dream car
            <strong>
              {item.make} {item.model}
            </strong>
          </Popup>
        </Marker>
      );
    });
  };

  render() {
    var centerLat = (this.getMinLat() + this.getMaxLat()) / 2;
    var distanceLat = this.getMaxLat() - this.getMinLat();
    var bufferLat = distanceLat * 0.05;
    var centerLong = (this.getMinLng() + this.getMaxLng()) / 2;
    var distanceLong = this.getMaxLng() - this.getMinLng();
    var bufferLong = distanceLong * 0.15;
    console.log(
      centerLat,
      distanceLat,
      bufferLat,
      centerLong,
      distanceLong,
      bufferLong,
      distanceLong
    );
    const position = [centerLat, centerLong];
    return (
      <div id="mapid" style={{ height: "180px" }}>
        <Map
          center={position}
          zoom={1}
          style={{ overflow: "hidden", height: "200%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {this.renderMap(this.state.leafletData)}
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
