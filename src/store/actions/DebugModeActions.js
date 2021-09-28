export const SET_DEBUG_BASE_URL = "SET_DEBUG_BASE_URL";
// for developer use, setting url base for rest-api
export const setDebugBaseUrl = (urlBase) => {
  return { type: SET_DEBUG_BASE_URL, urlBase };
};
