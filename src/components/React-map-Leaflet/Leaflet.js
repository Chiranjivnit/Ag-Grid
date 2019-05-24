import React,{Component} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux';

class Leaflet extends Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505, // lat:[]
      lng: -0.09,  // lan:[]
      zoom: 13     // zoom:[]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.AgGriddata !== this.props.AgGriddata) {
     // console.log(this.props.AgGriddata)
      this.setState({
        lat:this.props.AgGriddata.lat,
        lan:this.props.AgGriddata.lan,
        zoom:this.props.AgGriddata.zoom,
        
      });
      console.log(this.props.AgGriddata.lan)
    }
  }

  render() {
    console.log(this.props)
    const position = [this.state.lat, this.state.lng];
    return (
      <div id="mapid" style={{height:"180px"}}>
      <Map center={position} zoom={this.state.zoom} style={{overflow:"hidden",height:"200%"}} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    LeafletData:state.AgGridReducer
  };
};
export default connect (mapStateToProps,null) (Leaflet);