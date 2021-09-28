
import { SET_DEBUG_BASE_URL } from "../actions/DebugModeActions";

const initialState = {
  urlBase: "http://10.0.0.9:5000",
};

// for developer use
const debugReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEBUG_BASE_URL:
      return { ...state, urlBase: action.urlBase };
    default:
      return state;
  }
};

export default debugReducer;
