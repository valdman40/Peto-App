import { SAVE_LOGGED_USER } from "../actions/UserActions";
import CacheManager, { UserCache } from "../../resources/CacheManager";

const initialState = {
  loggedUser: {},
};

/**
 * saves logged user in cache (of phone)
 * @param {*} loggedUser 
 */
const saveUserInCache = async (loggedUser) => {
  await CacheManager.setCache(UserCache.name, UserCache.types.lastLoggedUser, loggedUser);
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      saveUserInCache(action.user);
      return {
        ...state,
        loggedUser: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
