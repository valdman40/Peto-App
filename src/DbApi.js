import { USERS } from "./data/dummy-data";
export default class DbApi {
  /**
   * try to login
   * @param {*} username
   * @param {*} password
   */
  static async Login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const matchedUsers = USERS.filter((e) => e.Username === username && e.Password === password);
        if (matchedUsers.length > 0) {
          resolve(matchedUsers[0]);
        } else {
          reject("username and password doesn't match");
        }
      }, 1500);
    });
  }
}
