import React from "react";
import Messages from "./resources/Messages";
import { RestApiExtensions, HTTP_METHODS } from "../src/resources/Strings";
// import fetch from "./FetchWithTimeOut";

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
    return this.functionWithTimeOut(3000, returnPromise);
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
  static async InsertPet(Name, Type, User_Id) {
    const uri = new URL(RestApiExtensions.Pets.InsertPet);
    const method = HTTP_METHODS.PUT;
    const body = JSON.stringify({ Name, Type, User_Id });
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
   * insert feeding to db
   * insert feedingId and with petId to table that connects them
   * @param {*} Name
   * @param {*} Amount
   * @param {*} Pet_Id
   * @returns
   */
  static async InsertSchedule(Name, Amount, Time, Pet_Id) {
    // alert("insert");
    return { name: "mealNew", amount: 60, time: "01:01", id: 1234 };
    // const uri = new URL(RestApiExtensions.Schedule.InsertSchedule);
    // const method = HTTP_METHODS.PUT;
    // const body = JSON.stringify({ Name, Amount, Pet_Id });
    // const headers = { Accept: "application/json", "Content-Type": "application/json" };
    // const requestObject = { method, headers, body };
    // const returnPromise = new Promise(async (resolve, reject) => {
    //   const response = await fetch(uri, requestObject);
    //   let retval = response.json();
    //   if (response.status == 201) {
    //     resolve(retval);
    //   } else {
    //     if (response.status == 409) {
    //       reject(Messages.PETNAME_EXIST);
    //     } else {
    //       reject(Messages.UNKNOWN_ERROR);
    //     }
    //   }
    // });
    // return this.functionWithTimeOut(3000, returnPromise);
  }

  static async UpdateMeal(updatedMeal) {
    const uri = `${RestApiExtensions.Meal.UpdateMeal}/${updatedMeal.id}`;
    const method = HTTP_METHODS.PATCH;
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
    const uri = `${RestApiExtensions.Meal.GetPetMeals}/${petId}`;
    const returnPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(uri);
      // let retval = JSON.parse(response.json());
      let retval = await response.json();
      if (retval.length == 0) {
        reject(Messages.NO_MEALS);
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
