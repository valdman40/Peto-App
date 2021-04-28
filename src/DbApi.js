import React from "react";
import Messages from "./resources/Messages";
import { RestApiExtensions, HTTP_METHODS } from "../src/resources/Strings";

const standartHeaders = { Accept: "application/json", "Content-Type": "application/json" };

export default class DbApi extends React.Component {
  /**
   * executes function with timout timer, if exceeded time it will "reject" the request
   * @param {*} ms number of ms till exception
   * @param {*} promise promise to execute
   * @param {*} message message to diaply when timout
   * @returns
   */
  static functionWithTimeOut(ms, promise, message = Messages.FAILED_SERVER_CONNECTION) {
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
  static async Login(username, password) {
    const uri = new URL(RestApiExtensions.Users.GetUser);
    const method = HTTP_METHODS.POST;
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({ Username: username, Password: password });
    const requestObject = { method, headers, body };
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri, requestObject);
      let user = response.json();
      if (response.status == 200) {
        resolve(user);
      } else if (response.status == 404) {
        reject(Messages.USERNAME_PASS_NO_MATCH);
      } else {
        reject(Messages.UNKNOWN_ERROR);
      }
    });
    return this.functionWithTimeOut(1000, returnPromise);
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
    const body = JSON.stringify({ Username: username, Password: password, Name: name });
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const requestObject = { method, headers, body };
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri, requestObject);
      let retval = response.json();
      if (response.status == 200) {
        resolve(retval);
      } else {
        if (response.status == 409) {
          reject(Messages.USERNAME_EXIST);
        } else {
          reject(Messages.UNKNOWN_ERROR);
        }
      }
    });
    return this.functionWithTimeOut(1000, returnPromise);
  }

  /**
   * edit user's details
   * @param {*} username
   * @param {*} password
   * @param {*} newPassword
   * @param {*} name
   * @returns
   */
  static async EditUser(username, password, newPassword, name) {
    const uri = new URL(RestApiExtensions.Users.RegisterUser);
    const method = HTTP_METHODS.PATCH;
    const body = JSON.stringify({ Username: username, Password: password, New_Password: newPassword, Name: name });
    const requestObject = { method, standartHeaders, body };
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
        throw Messages.UNKNOWN_ERROR;
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
   * delete pet by petId
   * @param {*} petId
   * @returns
   */
  static async DeletePet(petId) {
    const uri = `${RestApiExtensions.Pets.DeletePet}/${petId}`;
    const method = HTTP_METHODS.DELETE;
    const requestObject = { method, standartHeaders };
    let response;
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        response = await fetch(uri, requestObject);
      } catch (e) {
        reject(Messages.FAILED_SERVER_CONNECTION);
      }
      if (response.status == 200) {
        resolve();
      } else {
        reject(Messages.DELETE_FAILED);
      }
    });
    return this.functionWithTimeOut(500, returnPromise);
  }

  /**
   * loads user's pets
   * @param {*} userId
   * @returns
   */
  static async LoadUserPets(userId) {
    const uri = `${RestApiExtensions.Pets.GetUserPets}/${userId}`;
    let response;
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        response = await fetch(uri);
      } catch (e) {
        reject(Messages.FAILED_SERVER_CONNECTION);
      }
      let retval = response.json();
      if (retval.length == 0) {
        reject(Messages.NO_PETS);
      } else {
        if (response.status == 200) {
          resolve(retval);
        } else {
          reject(Messages.UNKNOWN_ERROR);
        }
      }
    });
    return this.functionWithTimeOut(500, returnPromise);
  }
}
