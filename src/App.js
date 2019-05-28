import React, { Component } from 'react';
import AgGrid from './components/ag-gride-view/AgGrid'
//import Leaflet from './components/React-map-Leaflet/Leaflet'
import './App.css'
class App extends Component {

  render() {

    return (
      <div>
        <AgGrid />
        <div id="mapid" style={{ height: "180px" }}>
          {/* <Leaflet /> */}
        </div>
      </div>
    );
  }
}

export default App;
