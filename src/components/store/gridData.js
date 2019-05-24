export const data = {
  columnDefs: [
    {
      headerName: "Make",
      field: "make",                                                            
      sortable: true,
      filter: true,
      // headerCheckboxSelection: true,
      // headerCheckboxSelectionFilteredOnly: true,
      // checkboxSelection: true
    },
    {
      headerName: "Model",
      field: "model",
      sortable: true,
      filter: true
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
      // headerCheckboxSelection: true,
      // checkboxSelection: true
    },
    {
      headerName: "Lat",
      field: "lat",
      sortable: true,
      filter: true,
     // headerCheckboxSelection: true,
      checkboxSelection: true
    },
  {
    headerName: "Lan",
      field: "lan",
      sortable: true,
      filter: true,
     // headerCheckboxSelection: true,
      checkboxSelection: true
  },{
    headerName: "Zoom",
      field: "zoom",
      sortable: true,
      filter: true,
     // headerCheckboxSelection: true,
      checkboxSelection: true
  }],
  rowData: [
    {
      make: "Toyota",
      model: "Celica",
      price: 750000,
      lat: 89.505,
      lng: -0.09,
      zoom: 14,
    },
    {
      make: "Ford",
      model: "Mondeo",
      price: 620000,
      lat: 53.505,
      lng: -1.09,
      zoom: 12,
    },
    {
      make: "Porsche",
      model: "Boxter",
      price: 4200000,
      lat: 69.505,
      lng: -2.09,
      zoom: 11,
    },
    {
      make: "BMW",
      model: "Celica",
      price: 7000000,
      lat: 78.505,
      lng: -3.09,
      zoom: 16,
    },
    {
      make: "Audi",
      model: "Celica",
      price: 8500000,
      lat: 91.505,
      lng: -4.09,
      zoom: 15,
    },
    {
      make: "HondaCity",
      model: "Celica",
      price: 650000,
      lat: 18.505,
      lng: -5.09,
      zoom: 2,
    },
    {
      make: "Tata Motors",
      model: "Celica",
      price: 559000,
      lat: 22.505,
      lng: -6.09,
      zoom: 3,
    },
    {
      make: "Ashok Leyland",
      model: "Celica",
      price: 5500000,
      lat: 35.505,
      lng: -7.09,
      zoom: 5,
    },
    {
      make: "Mahindra & Mahindra",
      model: "Celica",
      price: 95000,
      lat: 21.505,
      lng: -8.09,
      zoom: 6,
    },
    {
      make: "Renault",
      model: "Celica",
      price: 75000,
      lat: 31.505,
      lng: -9.09,
      zoom: 15,
    },
    {
      make: "Ferrari",
      model: "Ferrari V5",
      price: 980000000,
      lat: 41.505,
      lng: -10.09,
      zoom: 5,
    },
    {
      make: "Ferrari",
      model: "Ferrari 305",
      price: 35000000,
      lat: 51.505,
      lng: -11.09,
      zoom: 7,
    },
    {
      make: "Ferrari",
      model: "Ferrari Police",
      price: 15000000,
      lat: 71.505,
      lng: -12.09,
      zoom: 9,
    },
    {
      make: "Ferrari",
      model: "Ferrari V3",
      price: 50000000,
      lat: 61.505,
      lng: 13.09,
      zoom: 11,
    }
  ],
     rowSelection:"single"
};
