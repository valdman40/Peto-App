export const STORE_NEW_SCHEDULE = "STORE_NEW_SCHEDULE";
export const storeNewFeedingSchedule = (newFeedingSchedule) => {
  return { type: STORE_NEW_SCHEDULE, newFeedingSchedule };
};

export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
export const deleteFeedingSchedule = (scheduleId) => {
  return { type: DELETE_SCHEDULE, scheduleId };
};