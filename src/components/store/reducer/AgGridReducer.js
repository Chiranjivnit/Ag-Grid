import { ON_SELECTED_CHANGE_DATA } from "../../actions/actionType";
import { ON_SELECTED_LEAFLET_DATA } from "../../actions/actionType";

const inititialState = {
  data: [],
  leafletData: []
};

export const AgGridReducer = (state = inititialState, action) => {
  switch (action.type) {
    case ON_SELECTED_CHANGE_DATA:
      return { ...state, data: action.data };

    case ON_SELECTED_LEAFLET_DATA:
      return { ...state, leafletData: action.leafletData };

    default:
      return state;
  }
};
