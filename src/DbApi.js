export default class DbApi {
  /**
   * try to login
   * @param {*} username
   * @param {*} password
   */
  static async Login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "Roy" && password === "1234") {
          resolve({
            name: "roy",
          });
        } else {
          reject("username and password doesn't match");
        }
      }, 3000);
    });
  }
}
