import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { connect } from "react-redux";
import { onSelectedChangeData, onSelectedLeafletData } from "../actions/actionCreater";

import { data } from "../store/gridData";

class AgGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [],
      rowData: [],
      leafletData:[]
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
      this.setState({ rowData: data });
    };

    onSelectionChanged=()=> {
      var selectedRows = this.gridApi.getSelectedRows();
      var selectedRowsString = "";
      selectedRows.forEach(function(selectedRow, index) {
        if (index !== 0) {
          selectedRowsString += ", ";
        }
        selectedRowsString += selectedRow.make;
      });
      document.querySelector("#selectedRows").innerHTML = selectedRowsString;
      const leafletData=selectedRows
      this.setState({leafletData:leafletData})
      console.log(leafletData)
      this.props.onSelectedLeafletData (leafletData)
      
    }

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
    //this.props.onSelectedLeafletData(leafletData);
   //console.log(leafletData)
   //console.log (leafletData)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.AgGriddata !== this.props.AgGriddata) {
      console.log(this.props.AgGriddata.data)
      this.setState({
        columnDefs: this.props.AgGriddata.columnDefs,
        rowData: this.props.AgGriddata.rowData,
        rowSelection:this.props.AgGriddata.rowSelection,
        
      });
    }
  }

  render() {
    console.log(this.props)
    const { AgGriddata } = this.props;
    return (
      <div>
        <div class="test-container">
          <div class="test-header">
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
              onGridReady={ this.onGridReady }
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    AgGriddata: state.AgGridReducer,
    LeafletData:state.AgGridReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectedChangeData: (data) => dispatch(onSelectedChangeData(data)),
    onSelectedLeafletData:(leafletData)=>dispatch(onSelectedLeafletData(leafletData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgGrid);
