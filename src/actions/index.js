import * as types from "./ActionTypes";

export const setUserInfo = (userInfo) => ({
  type: types.SET_USERINFO,
  userInfo,
});
