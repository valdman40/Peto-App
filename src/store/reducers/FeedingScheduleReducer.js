import { STORE_NEW_SCHEDULE,DELETE_SCHEDULE } from "../actions/FeedingScheduleActions";

const initialState = {
  feedingSchedule: [],
};

const userReducer = (state = initialState, action) => {
  const { feedingSchedule } = this.state;
  switch (action.type) {
    case STORE_NEW_SCHEDULE:
      return {
        ...state,
        feedingSchedule: feedingSchedule.concat(action.newFeedingSchedule),
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
