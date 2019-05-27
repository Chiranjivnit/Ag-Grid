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

  componentWillReceiveProps(nextProps) {
    const { leafletData } = nextProps;
    if (leafletData !== this.props.leafletData) {
      this.setState({
        leafletData
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
          <RenderMap leafletData={this.state.leafletData} />
        </Map>
      </div>
    );
  }
}

const RenderMap = props => {
  const { leafletData } = props;

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

const mapStateToProps = state => {
  return {
    leafletData: state.AgGridReducer.leafletData
  };
};
export default connect(
  mapStateToProps,
  null
)(Leaflet);
