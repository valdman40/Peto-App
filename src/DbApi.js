import { USERS, PETS, USER_TO_PET } from "./data/dummy-data";
import Messages from "./resources/Messages";
export default class DbApi {
  /**
   * try to login
   * @param {*} username
   * @param {*} password
   */
  static async Login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const matchedUsers = USERS.filter(
          (user) => username.localeCompare(user.Username) === 0 && password.localeCompare(user.Password) === 0
        );
        if (matchedUsers.length > 0) {
          resolve(matchedUsers[0]);
        } else {
          reject(Messages.USERNAME_PASS_NO_MATCH);
        }
      }, 1500);
    });
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
        const PetsIds = USER_TO_PET.filter((userToPet) => userId === userToPet.userId).map(userToPet => userToPet.petId);
        const pets = PETS.filter((pet)=> PetsIds.includes(pet.id));
        if (pets.length > 0) {
          resolve(pets);
        } else {
          reject(Messages.NO_PETS);
        }
      }, 200);
    });
  }
}
