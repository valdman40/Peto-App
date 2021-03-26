export const USERS = [
  {
    id: 1,
    Username: "Roy",
    Password: "1234",
    Name: "roy waldman",
  },
  {
    id: 2,
    Username: "Yuval",
    Password: "1234",
    Name: "yuval cohen",
  },
];

export const PETS = [
  {
    id: 1,
    Name: "Tokyo",
    Type: "Dog",
  },
  {
    id: 2,
    Name: "Carla",
    Type: "Dog",
  },
  {
    id: 3,
    Name: "Luna",
    Type: "Cat",
  },
];

export const USER_TO_PET = [
  {
    // roy - tokyo
    id: 1,
    userId: 1,
    petId: 1,
  },
  {
    // yuval - carla
    id: 2,
    userId: 2,
    petId: 2,
  },
  {
    // roy - luna
    id: 3,
    userId: 1,
    petId: 3,
  },
];
