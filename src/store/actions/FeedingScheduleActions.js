export const LOAD_PET_SCHED = "LOAD_PET_SCHED";
export const loadPetFeedingSchedule = (schedule) => {
  return { type: LOAD_PET_SCHED, schedule };
};

export const STORE_NEW_SCHEDULE = "STORE_NEW_SCHEDULE";
export const storeNewFeedingSchedule = (newFeedingSchedule) => {
  return { type: STORE_NEW_SCHEDULE, newFeedingSchedule };
};

export const UPDATE_SCHEDULE = "UPDATE_SCHEDULE";
export const updateFeedingSchedule = (feedingSchedule) => {
  return { type: UPDATE_SCHEDULE, feedingSchedule };
};

export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
export const deleteFeedingSchedule = (scheduleId) => {
  return { type: DELETE_SCHEDULE, scheduleId };
};