import { USERS, PETS, USER_TO_PET } from "./data/dummy-data";
import Messages from "./resources/Messages";
export default class DbApi {
  /**
   * try to login
   * @param {*} username
   * @param {*} password
   */
  static async Login(username, password) {
    var url = `http://10.0.0.9:5000/users?Username=${username}&Password=${password}`;
    const response = await fetch(url);
    let retval = response.json();
    if (response.status == 200) {
      return retval;
    } else {
      if (response.status == 404) {
        throw Messages.USERNAME_PASS_NO_MATCH;
      } else {
        throw retval;
      }
    }
  }

  static async Test() {
    const url = "http://10.0.0.9:5000/video/2";
    const retval = await fetch(url);
    let object = await retval.json();
    return object;
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
