export const STORE_NEW_PET = "STORE_NEW_PET";
export const storeNewPet = (newPet) => {
  return { type: STORE_NEW_PET, newPet };
};

export const DELETE_PET_FROM_STORE = "DELETE_PET_FROM_STORE";
export const deletePetFromStore = (petId) => {
  return { type: DELETE_PET_FROM_STORE, petId };
};

export const STORE_USER_PETS = "STORE_USER_PETS";
export const storeUserPets = (pets) => {
  return { type: STORE_USER_PETS, pets };
};
