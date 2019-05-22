import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class AgGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", sortable: true, filter: true, headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Price", field: "price", sortable: true, filter: true, headerCheckboxSelection: true,
        checkboxSelection: true
      }],
      rowData: [{
        make: "Toyota", model: "Celica", price: 750000
      }, {
        make: "Ford", model: "Mondeo", price: 620000
      }, {
        make: "Porsche", model: "Boxter", price: 4200000
      }, {
        make: "BMW", model: "Celica", price: 7000000
      }, {
        make: "Audi", model: "Celica", price: 8500000
      }, {
        make: "HondaCity", model: "Celica", price: 650000
      }, {
        make: "Tata Motors", model: "Celica", price: 559000
      }, {
        make: "Ashok Leyland", model: "Celica", price: 5500000
      }, {
        make: "Mahindra & Mahindra", model: "Celica", price: 95000
      }, {
        make: "Renault", model: "Celica", price: 75000
      }, {
        make: "Ferrari", model: "Ferrari V5", price: 980000000
      }, {
        make: "Ferrari", model: "Ferrari 305", price: 35000000
      }, {
        make: "Ferrari", model: "Ferrari Police", price: 15000000
      }, {
        make: "Ferrari", model: "Ferrari V3", price: 50000000
      }],
      defaultColDef: {
        width: 200,
        sortable: true,
        resizable: true,
        filter: true
      },
      rowMultiSelectWithClick: true,
      isRowSelectable: (rowNode) => {
        return rowNode.rowData ? rowNode.rowData.price < 1100000 : false;
      }
    }
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var rowData = this.state.rowData
    this.setState({ rowData })
  }

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
  }


  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  }


  onRowSelected = (event) => {
    window.alert("row " + event.node.data.make + " selected = " + event.node.selected);
  }

  onSelectionChanged = (event) => {
    var rowCount = event.api.getSelectedNodes().length;
    window.alert("selection changed, " + rowCount + " rows selected");
  }

  selectAllMaker = () => {
    this.gridApi.forEachNode((node) => {
      var rowData = this.state.rowData
      this.setState({ rowData })
      if (node.rowData.make === "Ferrari") {
        node.setSelected(true);
      }
    });
  }

  render() {
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
              columnDefs={this.state.columnDefs}
              rowSelection={this.state.rowSelection}
              onGridReady={this.onGridReady}
              onSelectedChanged={this.onSelectedChanged}
              rowData={this.state.rowData}
              rowSelection="multiple"
              onQuickFilterChanged={this.onQuickFilterChanged}
              //isRowSelectable={this.state.isRowSelectable}
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

export default AgGrid;