import React from "react";
import Messages from "./resources/Messages";
import { getRestApi, HTTP_METHODS } from "../src/resources/Strings";
import PetoStore from "./store/PetoStore";

export default class DbApi extends React.Component {
  /**
   * executes function with timout timer, if exceeded time it will "reject" the request
   * @param {*} ms number of ms till exception
   * @param {*} promise promise to execute
   * @param {*} message message to diaply when timout
   * @returns
   */
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
   * sends http requests
   * @param {*} uri path of api
   * @param {*} method type of request
   * @param {*} body body of request
   * @param {*} headers
   * @returns
   */
  static async SendHttpReqeust(
    uri,
    method = HTTP_METHODS.GET,
    body = null,
    headers = { Accept: "application/json", "Content-Type": "application/json" }
  ) {
    const returnPromise = new Promise(async (resolve, reject) => {
      let response;
      let retval;
      try {
        let ob = { method, headers };
        if (method != HTTP_METHODS.GET) {
          // if method is not GET, i excpect it to have body
          if (body) {
            ob.body = body;
          } else {
            reject(Messages.EXPECTED_BODY);
            return;
          }
        }
        const requestObject = ob;
        response = await fetch(uri, requestObject);
        retval = await response.json();
      } catch (e) {
        reject(e);
        return;
      }
      if (response && response.status <= 201) {
        resolve(retval);
      } else {
        reject(retval.message);
      }
    });
    return this.functionWithTimeOut(6000, returnPromise);
  }

  /**
   * try to login
   * @param {*} username
   * @param {*} password
   */
  static async Login(username, password) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = new URL(RestApiExtensions.Users.GetUser);
    const method = HTTP_METHODS.POST;
    const body = JSON.stringify({ Username: username, Password: password });
    return this.SendHttpReqeust(uri, method, body);
  }

  /**
   * update users token in DB
   * @param {*} push_notification_token
   * @param {*} userId
   * @returns
   */
  static async UpdateUserPushNotificationToken(push_notification_token, userId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Users.UpdateToken}/${userId}`;
    const method = HTTP_METHODS.PATCH;
    const body = JSON.stringify({ push_notification_token });
    return this.SendHttpReqeust(uri, method, body);
  }
  /**
   * register new user
   * @param {*} name
   * @param {*} username
   * @param {*} password
   */
  static async RegisterUser(username, password, name) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = new URL(RestApiExtensions.Users.RegisterUser);
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify({ Username: username, Password: password, Name: name });
    return this.SendHttpReqeust(uri, method, body);
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
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Users.EditUser}/${id}`;
    const method = HTTP_METHODS.PATCH;
    const body = JSON.stringify({ Username, New_Password, Name });
    return this.SendHttpReqeust(uri, method, body);
  }

  /**
   * insert pet to db
   * insert petId and userId to table that connects them
   * also changes the machine_id properly
   * @param {*} Name
   * @param {*} Type
   * @param {*} User_Id
   * @param {*} Machine_Id
   * @returns
   */
  static async InsertPet(Name, Type, User_Id, Machine_Id) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = new URL(RestApiExtensions.Pets.InsertPet);
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify({ Name, Type, User_Id, Machine_Id });
    return this.SendHttpReqeust(uri, method, body);
  }

  /**
   * delete pet by petId (make it unactive)
   * @param {*} petId
   * @returns
   */
  static async DeletePet(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Pets.DeletePet}/${petId}`;
    const method = HTTP_METHODS.DELETE;
    return this.SendHttpReqeust(uri, method);
  }

  /**
   * delete pet by petId
   * @param {*} petId
   * @returns
   */
  static async GetPet(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Pets.GetPet}/${petId}`;
    const method = HTTP_METHODS.GET;
    return this.SendHttpReqeust(uri, method);
  }

  /**
   * insert meal to db
   * insert meal with petId to table that connects them
   * @param {*} meal
   * @returns
   */
  static async InsertMeal(meal, pet_id) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Meal.InsertMeal}/${pet_id}`;
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify(meal);
    return this.SendHttpReqeust(uri, method, body);
  }

  /**
   * updates meal in DB
   * @param {*} updatedMeal
   * @returns
   */
  static async UpdateMeal(updatedMeal) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Meal.UpdateMeal}/${updatedMeal.id}`;
    const method = HTTP_METHODS.PATCH;
    const body = JSON.stringify(updatedMeal);
    return this.SendHttpReqeust(uri, method, body);
  }

  /**
   * delete schedule of feeding
   * @param {*} mealId
   * @returns
   */
  static async DeleteMeal(mealId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Meal.DeleteMeal}/${mealId}`;
    const method = HTTP_METHODS.DELETE;
    return this.SendHttpReqeust(uri, method);
  }

  /**
   * saves health rate
   * @param {*} pet_id 
   * @param {*} date 
   * @param {*} rate 
   * @returns 
   */
  static async SavePetRating(pet_id, date, rate) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Pets.Rating}/${pet_id}`;
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify({ rate, pet_id, date });
    return this.SendHttpReqeust(uri, method, body);
  }

  /**
   * get health rate
   * @param {*} petId 
   * @returns 
   */
  static async GetPetRating(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Pets.Rating}/${petId}`;
    const method = HTTP_METHODS.GET;
    return this.SendHttpReqeust(uri, method);
  }

  /**
   * get all stats relevant for pet's health graph:
   * 1. amount given for each day
   * 2. amount eaten for each day
   * 3. rating of health for each day
   * @param {*} petId 
   * @returns 
   */
  static async GetPetHealthGraph(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Pets.Graph}/${petId}`;
    const method = HTTP_METHODS.GET;
    return this.SendHttpReqeust(uri, method);
  }

  /**
   * loads user's pets
   * @param {*} userId
   * @returns
   */
  static async LoadUserPets(userId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Pets.GetUserPets}/${userId}`;
    return this.SendHttpReqeust(uri);
  }

  /**
   * loads pet's feeding schedule
   * @param {*} petId
   * @returns
   */
  static async GetPetMeals(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Meal.GetPetMeals}/${petId}`;
    return this.SendHttpReqeust(uri);
  }

  /**
   * loads pet's meals history
   * @param {*} petId
   * @returns
   */
  static async GetPetMealsHistory(petId) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Meal.GetPetMealsHistory}/${petId}`;
    return this.SendHttpReqeust(uri);
  }

  /**
   * feeds pet right now
   * @param {*} pet
   * @returns
   */
  static async FeedPet(pet, Amount) {
    const urlBase = PetoStore.getState().Settings.urlBase;
    const RestApiExtensions = getRestApi(urlBase);
    const uri = `${RestApiExtensions.Pets.FeedPet}/${pet.id}`;
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify({ Amount });
    return this.SendHttpReqeust(uri, method, body);
  }
}
