import { ON_SELECTED_CHANGE_DATA } from "./actionType";

export const getData = data => {
  return {
    type: ON_SELECTED_CHANGE_DATA,
    data
  };
};

export const onSelectedChangeData = (data) => {
  return dispatch => dispatch(getData(data));
};
