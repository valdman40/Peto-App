import { STORE_NEW_PET, STORE_USER_PETS } from "../actions/PetsActions";

const initialState = {
  userPets: [],
};

const userReducer = (state = initialState, action) => {
  const { userPets } = initialState;
  switch (action.type) {
    case STORE_NEW_PET:
      return {
        ...state,
        userPets: userPets.concat(action.newPet),
      };
    case STORE_USER_PETS:
      return{
        ...state,
        userPets: action.pets,
      };
    default:
      return state;
  }
};

export default userReducer;
