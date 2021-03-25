export const SAVE_LOGGED_USER = "SAVE_LOGGED_USER";
export const saveLoggedUser = (user) => {
  return { type: SAVE_LOGGED_USER, user };
};
