import {
  LOAD_PET_SCHED,
  STORE_NEW_SCHEDULE,
  DELETE_SCHEDULE,
  UPDATE_SCHEDULE,
} from "../actions/FeedingScheduleActions";

const initSched = [
  { name: "meal1", amount: 100, time: "01:00", id: 1 },
  { name: "meal2", amount: 30, time: "02:00", id: 2 },
  { name: "meal3", amount: 80, time: "03:00", id: 3 },
];

const initialState = {
  feedingSchedule: initSched,
};

const userReducer = (state = initialState, action) => {
  const { feedingSchedule } = state;
  switch (action.type) {
    case LOAD_PET_SCHED:
      return {
        ...state,
        feedingSchedule: action.schedule,
      };
    case STORE_NEW_SCHEDULE:
      return {
        ...state,
        feedingSchedule: feedingSchedule.concat(action.newFeedingSchedule),
      };
    case UPDATE_SCHEDULE:
      var index = feedingSchedule
        .map(function (x) {
          return x.id;
        })
        .indexOf(action.feedingSchedule.id);
      const updatedFeedingSchedule = feedingSchedule;
      if (index !== -1) {
        updatedFeedingSchedule[index] = action.feedingSchedule;
      }
      return {
        ...state,
        feedingSchedule: [...updatedFeedingSchedule],
      };
    case DELETE_SCHEDULE:
      const newPetSchedule = feedingSchedule.filter((schedule) => schedule.id != action.scheduleId);
      return {
        ...state,
        feedingSchedule: newPetSchedule,
      };
    default:
      return state;
  }
};

export default userReducer;
