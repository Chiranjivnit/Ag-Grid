import { ON_SELECTED_CHANGE_DATA } from "./actionType";
import { ON_SELECTED_LEAFLET_DATA } from './actionType';

export const getData = data => {
  return {
    type: ON_SELECTED_CHANGE_DATA,
    data: data
  };
};

export const onSelectedChangeData = (data) => {
  return dispatch => dispatch(getData(data));
};


export const getLeafletData = leafletData => {
  return {
    type: ON_SELECTED_LEAFLET_DATA,
    leafletData: leafletData
  }
}

export const onSelectedLeafletData = (leafletData) => {
  return dispatch => dispatch(getLeafletData(leafletData));
};