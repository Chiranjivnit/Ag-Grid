import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { connect } from "react-redux";
import { onSelectedChangeData } from "../actions/actionCreater";

import { data } from "../store/gridData";

class AgGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [],
      rowData: [],
      defaultColDef: {
        width: 200,
        sortable: true,
        resizable: true,
        filter: true
      },
      rowMultiSelectWithClick: true,
      isRowSelectable: rowNode => {
        return rowNode.data ? rowNode.data.price < 1100000 : false;
      }
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var rowData = this.props.agGriddata.rowData;
    this.setState({ rowData });
  };

  onSelectedChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach((selectedRow, index) => {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.make;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  };

  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  };

  onRowSelected = event => {
    window.alert(
      "row " + event.node.data.make + " selected = " + event.node.selected
    );
  };

  onSelectionChanged = event => {
    var rowCount = event.api.getSelectedNodes().length;
    window.alert("selection changed, " + rowCount + " rows selected");
  };

  selectAllMaker = () => {
    this.gridApi.forEachNode(node => {
      var rowData = this.props.agGriddata.rowData;
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
    if (nextProps.agGriddata !== this.props.agGriddata) {
      //Perform some operation
      this.setState({
        columnDefs: this.props.agGriddata.columnDefs,
        rowData: this.props.agGriddata.rowData
      });
    }
  }

  render() {
    const { agGriddata } = this.props;
    return (
      <div style={{ width: "100px", height: "100px" }}>
        <div class="test-container">
          <div class="test-header">
            Selection:
            <span id="selectedRows" />
          </div>
          <div
            id="myGrid"
            style={{
              height: "300px",
              width: "600px"
            }}
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={agGriddata.columnDefs || []}
              // rowSelection={this.st}
              onGridReady={this.onGridReady}
              onSelectedChanged={this.onSelectedChanged}
              rowData={agGriddata.rowData || []}
              rowSelection="multiple"
              onQuickFilterChanged={this.onQuickFilterChanged}
              isRowSelectable={this.state.isRowSelectable}
              onRowSelected={this.onRowSelected}
              onSelectionChanged={this.onSelectionChanged}
            />
          </div>
        </div>
        <div style={{ position: "absolute", top: "0px", right: "210px" }}>
          <button onClick={this.selectAllMaker}>Select all Maker</button>
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
  return {
    agGriddata: state.agGridReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectedChangeData: data => dispatch(onSelectedChangeData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgGrid);
