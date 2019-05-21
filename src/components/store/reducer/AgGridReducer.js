import { ON_SELECTED_CHANGE_DATA } from "../../actions/actionType";

const INITIAL_STATE = {
  data: {}
};

export default function agGridReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ON_SELECTED_CHANGE_DATA:
      return action.data;
    default:
      return state;
  }
}
