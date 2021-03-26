export const STORE_NEW_PET = "STORE_NEW_PET";
export const saveNewPet = (newPet) => {
  return { type: STORE_NEW_PET, newPet };
};

export const STORE_USER_PETS = "STORE_USER_PETS";
export const saveUserPets = (pets) => {
  return { type: STORE_USER_PETS, pets };
};
