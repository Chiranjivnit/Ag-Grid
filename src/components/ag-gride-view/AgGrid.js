import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { connect } from "react-redux";
import Leaflet from '../React-map-Leaflet/Leaflet'
import {
  onSelectedChangeData,
  onSelectedLeafletData
} from "../actions/actionCreater";

import { data } from "../store/gridData";

class AgGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [],
      rowData: [],
      leafletData: [],
      newData:[]
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({ rowData: data });
  };

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.make;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
    
    this.props.onSelectedLeafletData(selectedRows);
   // console.log(this.state.newData)

  };

  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  };

  selectAllMaker = () => {
    this.gridApi.forEachNode(node => {
      var rowData = this.props.AgGriddata.rowData;
      this.setState({ rowData });
      if (node.data.make === "Ferrari") {
        node.setSelected(true);
      }
    });
  };

  componentDidMount() {
    this.props.onSelectedChangeData(data);
  }
  componentWillReceiveProps(nextProps) {
    const { AgGriddata } = nextProps;
    if (AgGriddata !== this.props.AgGriddata) {
      this.setState({
        columnDefs: AgGriddata.columnDefs,
        rowData: AgGriddata.rowData,
        rowSelection: AgGriddata.rowSelection
      });
    }
  }

  render() {
    const { AgGriddata } = this.props;
    return (
      <div>
        <div className="test-container">
          <div className="test-header">
            Selection:
            <span id="selectedRows" />
          </div>
          <div
            id="myGrid"
            style={{
              height: "400px",
              width: "1200px"
            }}
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={AgGriddata.columnDefs || []}
              rowData={AgGriddata.rowData || []}
              rowSelection={AgGriddata.rowSelection || []}
              onGridReady={this.onGridReady}
              onSelectionChanged={this.onSelectionChanged}
              onQuickFilterChanged={this.onQuickFilterChanged}
              isRowSelectable={this.state.isRowSelectable}
            />
          </div>
        </div>
        <div style={{ position: "absolute", top: "10px", left: "1027px" }}>
          <input
            type="text"
            onInput={this.onQuickFilterChanged}
            id="quickFilter"
            placeholder="quick filter..."
          />
        </div>
        <Leaflet leafletData={this.state.leafletData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AgGriddata: state.AgGridReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectedChangeData: data => dispatch(onSelectedChangeData(data)),
    onSelectedLeafletData: leafletData => dispatch(onSelectedLeafletData(leafletData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgGrid);
