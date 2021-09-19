import { SET_BASE_URL } from "../actions/SettingsActions";

import CacheManager, { SettingsCache } from "../../resources/CacheManager";

const initialState = {
  urlBase: "http://10.0.0.9:5000",
};

const tryToGetUrlFromCache = async () => {
  return await CacheManager.loadEntrieValue(SettingsCache.name, SettingsCache.types.urlBase);
};

// loading from cache if there is value
(async () => {
  try {
    const urlBase = await tryToGetUrlFromCache();
    initialState.urlBase = urlBase;
  } catch (e) {
    console.log(e);
  }
})();

const saveUrlBaseInCache = async (urlBase) => {
  await CacheManager.setCache(SettingsCache.name, SettingsCache.types.urlBase, urlBase);
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE_URL:
      saveUrlBaseInCache(action.urlBase);
      return { ...state, urlBase: action.urlBase };
    default:
      return state;
  }
};

export default settingsReducer;
