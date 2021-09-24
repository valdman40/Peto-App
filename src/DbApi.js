import React from "react";
import Messages from "./resources/Messages";
import { getUrl, HTTP_METHODS } from "../src/resources/Strings";
import PetoStore from "./store/PetoStore";

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
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
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
    return this.functionWithTimeOut(3000, returnPromise);
  }

  static async UpdateUserPushNotificationToken(push_notification_token, userId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Users.UpdateToken}/${userId}`;
    const method = HTTP_METHODS.PATCH;
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({ push_notification_token });
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
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * register new user
   * @param {*} name
   * @param {*} username
   * @param {*} password
   */
  static async RegisterUser(username, password, name) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
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
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * edit user's details
   * @param {*} Username
   * @param {*} New_Password
   * @param {*} Name
   * @param {*} id
   * @returns
   */
  static async EditUser(Username, New_Password, Name, id) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Users.EditUser}/${id}`;
    const method = HTTP_METHODS.PATCH;
    const body = JSON.stringify({ Username, New_Password, Name });
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const requestObject = { method, headers, body };
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri, requestObject);
      let retval = response.json();
      if (response.status == 201) {
        resolve(retval);
      } else {
        reject(Messages.UNKNOWN_ERROR);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * insert pet to db
   * insert petId and userId to table that connects them
   * @param {*} Name
   * @param {*} Type
   * @param {*} User_Id
   * @returns
   */
  static async InsertPet(Name, Type, User_Id, Machine_Id) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = new URL(RestApiExtensions.Pets.InsertPet);
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify({ Name, Type, User_Id, Machine_Id });
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const requestObject = { method, headers, body };
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri, requestObject);
      let retval = response.json();
      if (response.status == 201) {
        resolve(retval);
      } else {
        if (response.status == 409) {
          reject(Messages.PETNAME_EXIST);
        } else {
          reject(Messages.UNKNOWN_ERROR);
        }
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * delete pet by petId
   * @param {*} petId
   * @returns
   */
  static async DeletePet(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
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
        resolve(response.json());
      } else {
        reject(Messages.DELETE_FAILED);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * delete pet by petId
   * @param {*} petId
   * @returns
   */
  static async GetPet(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Pets.GetPet}/${petId}`;
    const method = HTTP_METHODS.GET;
    const requestObject = { method, standartHeaders };
    let response;
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        response = await fetch(uri, requestObject);
      } catch (e) {
        reject(Messages.FAILED_SERVER_CONNECTION);
      }
      if (response.status == 200) {
        const retval = await response.json();
        resolve(retval);
      } else {
        reject(Messages.GET_FAILED);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * insert meal to db
   * insert meal with petId to table that connects them
   * @param {*} meal
   * @returns
   */
  static async InsertMeal(meal, pet_id) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Meal.InsertMeal}/${pet_id}`;
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify(meal);
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const requestObject = { method, headers, body };
    let response;
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        response = await fetch(uri, requestObject);
      } catch (e) {
        reject(Messages.FAILED_SERVER_CONNECTION);
      }
      if (response.status == 200) {
        const retval = await response.json();
        resolve(retval);
      } else {
        reject(Messages.INSERT_FAILED);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  static async UpdateMeal(updatedMeal) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Meal.UpdateMeal}/${updatedMeal.id}`;
    const method = HTTP_METHODS.PATCH;
    console.log({ updatedMeal });
    const body = JSON.stringify(updatedMeal);
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const requestObject = { method, headers, body };
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
        reject(Messages.UPDATE_FAILED);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * delete schedule of feeding
   * @param {*} mealId
   * @returns
   */
  static async DeleteSchedule(mealId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Meal.DeleteMeal}/${mealId}`;
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
        resolve(response.json());
      } else {
        reject(Messages.DELETE_FAILED);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * loads user's pets
   * @param {*} userId
   * @returns
   */
  static async LoadUserPets(userId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Pets.GetUserPets}/${userId}`;
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri);
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
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * loads pet's feeding schedule
   * @param {*} petId
   * @returns
   */
  static async GetPetMeals(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Meal.GetPetMeals}/${petId}`;
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri);
      let retval = await response.json();
      if (retval.length == 0 || response.status == 404) {
        resolve([]);
      } else {
        if (response.status == 200) {
          resolve(retval);
        } else {
          reject(Messages.UNKNOWN_ERROR);
        }
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * loads pet's meals history
   * @param {*} petId
   * @returns
   */
  static async GetPetMealsHistory(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Meal.GetPetMealsHistory}/${petId}`;
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri);
      let retval = await response.json();
      if (retval.length == 0 || response.status == 404) {
        resolve([]);
      } else {
        if (response.status == 200) {
          resolve(retval);
        } else {
          reject(Messages.UNKNOWN_ERROR);
        }
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  /**
   * feeds pet right now
   * @param {*} pet
   * @returns
   */
  static async FeedPet(pet, Amount) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getUrl(urlBase);
    const uri = `${RestApiExtensions.Pets.FeedPet}/${pet.id}`;
    const method = HTTP_METHODS.PUT;
    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({ Amount });
    const requestObject = { method, headers, body };
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri, requestObject);
      if (response.status == 200) {
        resolve();
      }
      // else if (response.status == 404) {
      //   reject(Messages.USERNAME_PASS_NO_MATCH);
      // }
      else {
        reject(Messages.UNKNOWN_ERROR);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }
}
