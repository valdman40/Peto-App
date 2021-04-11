import React from "react";
import { PETS, USER_TO_PET } from "./data/dummy-data";
import Messages from "./resources/Messages";
import { RestApiExtensions, HTTP_METHODS } from "../src/resources/Strings";
export default class DbApi extends React.Component {
  static functionWithTimeOut(ms, promise, message = Messages.TIMEOUT) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(message);
      }, ms);
      promise
        .then((value) => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch((reason) => {
          clearTimeout(timer);
          reject(reason);
        });
    });
  }

  /**
   * try to login
   * @param {*} username
   * @param {*} password
   */
  static Login(username, password) {
    const uri = new URL(RestApiExtensions.Users.GetUser);
    uri.searchParams.append("Username", username);
    uri.searchParams.append("Password", password);
    let response;
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        response = await fetch(uri);
      } catch (e) {
        reject(Messages.FAILED_SERVER_CONNECTION);
      }
      let retval = response.json();
      if (response.status == 200) {
        resolve(retval);
      } else {
        if (response.status == 404) {
          reject(Messages.USERNAME_PASS_NO_MATCH);
        } else {
          reject("unknown error");
        }
      }
    });
    return this.functionWithTimeOut(1500, returnPromise);
  }

  /**
   * register new user
   * @param {*} name
   * @param {*} username
   * @param {*} password
   */
  static async RegisterUser(username, password, name) {
    const uri = new URL(RestApiExtensions.Users.RegisterUser);
    const method = HTTP_METHODS.PUT;
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({ Username: username, Password: password, Name: name });
    const requestObject = { method, headers, body };
    let response;
    try {
      response = await fetch(uri, requestObject);
    } catch (e) {
      throw Messages.FAILED_SERVER_CONNECTION;
    }
    let retval = response.json();
    if (response.status == 201) {
      return retval;
    } else {
      if (response.status == 409) {
        throw Messages.USERNAME_EXIST;
      } else {
        throw "err";
      }
    }
  }

  ///
  static async EditUser(username, password, newPassword, name) {
    const uri = new URL(RestApiExtensions.Users.RegisterUser);
    const method = HTTP_METHODS.PATCH;
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({ Username: username, Password: password, New_Password: newPassword, Name: name });
    const requestObject = { method, headers, body };
    let response;
    try {
      response = await fetch(uri, requestObject);
    } catch (e) {
      throw Messages.FAILED_SERVER_CONNECTION;
    }
    let retval = response.json();
    if (response.status == 201) {
      return retval;
    } else {
      if (response.status == 409) {
        throw Messages.USERNAME_EXIST;
      } else {
        throw "err";
      }
    }
  }

  /**
   * insert pet to db
   * insert petId and userId to table that connects them
   * @param {*} pet
   * @param {*} userId
   * @returns
   */
  static async InsertPet(pet, userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  /**
   * loads user's pets
   * @param {*} userId
   * @returns
   */
  static async LoadUserPets(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // filter leaves us with userToPet relevant rows
        // map leaves us with only property of petId
        const PetsIds = USER_TO_PET.filter((userToPet) => userId === userToPet.userId).map(
          (userToPet) => userToPet.petId
        );
        const pets = PETS.filter((pet) => PetsIds.includes(pet.id));
        if (pets.length > 0) {
          resolve(pets);
        } else {
          reject(Messages.NO_PETS);
        }
      }, 200);
    });
  }
}
