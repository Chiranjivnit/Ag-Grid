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
      zoom: 13,
      leafletData: [] // zoom:[]
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      leafletData,
      leafletData: { lat, lng, zoom, make, price, model }
    } = nextProps;
    if (leafletData !== this.props.leafletData) {
      this.setState({
        lat,
        lng,
        zoom,
        make,
        price,
        model
      });
      console.log(leafletData)
    }
  }

  addMultiDataToMap = () => {
    // const { leafletData } = this.props
    const data = this.props.leafletData
    // this.setState({ leafletData: leafletData })
    console.log(data)
    data.map((leafData, index) => {
      return this.state.leafletData.push(<Marker position={leafData.lat && leafData.lng} key={index}>
        <Popup>
          welcome  <strong style={{ textSizeAdjust: "80%" }}>{this.state.make}  {this.state.model}</strong>  DreamzsCar <br /> check out price  <strong>{this.state.price}</strong>  for your  dream car  <strong>{this.state.make} {this.state.model}</strong>
        </Popup>
      </Marker>)
    })
    //console.log (leafletData);
  }

  render() {
    console.log("leafletData",this.props.leafletData)
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
          {/* <Marker position={position} 
        
          >
            <Popup>
              welcome  <strong style={{ textSizeAdjust: "80%" }}>{this.state.make}  {this.state.model}</strong>  DreamzsCar <br /> check out price  <strong>{this.state.price}</strong>  for your  dream car  <strong>{this.state.make} {this.state.model}</strong>
            </Popup>
          </Marker> */}

        </Map>
        <button onClick={this.addMultiDataToMap}>Hii</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    leafletData: state.AgGridReducer.leafletData
  };
};
export default connect(
  mapStateToProps,
  null
)(Leaflet);
