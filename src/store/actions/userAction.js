import { SET_USER_INFO } from "../types/userType";

// action creator
export const setUserInfoAction = (data) => {
  return {
    type: SET_USER_INFO,
    payload: data,
  };
};
