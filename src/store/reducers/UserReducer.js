import { SAVE_LOGGED_USER } from "../actions/UserActions";

const initialState = {
  loggedUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
