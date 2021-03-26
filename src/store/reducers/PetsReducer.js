import { STORE_NEW_PET, STORE_USER_PETS, DELETE_PET_FROM_STORE } from "../actions/PetsActions";

const initialState = {
  userPets: [],
};

const userReducer = (state = initialState, action) => {
  const { userPets } = state;
  switch (action.type) {
    case STORE_NEW_PET:
      return {
        ...state,
        userPets: userPets.concat(action.newPet),
      };
    case DELETE_PET_FROM_STORE:
      const newUserPets = userPets.filter((pet) => pet.id != action.petId);
      return {
        ...state,
        userPets: newUserPets,
      };
    case STORE_USER_PETS:
      return {
        ...state,
        userPets: action.pets,
      };
    default:
      return state;
  }
};

export default userReducer;
