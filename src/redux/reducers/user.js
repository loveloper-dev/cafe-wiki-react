const SET_LOGIN = "SET_LOGIN";

const initialState = {
  // store
  isLogin: localStorage.getItem("userInfo") ? true : false,
};

const reducer = (state = initialState, action) => {
  // 어떤 함수를 사용할지(액션을 실행할지) 결정
  switch (action.type) {
    case SET_LOGIN:
      return applySetLogin(state, action);
    default:
      return state;
  }
};

const setLogin = (isLogin) => {
  // = actionCreators
  // 액션 호출함수
  return {
    type: SET_LOGIN,
    isLogin,
  };
};

const applySetLogin = (state, action) => {
  // 액션 함수
  const { isLogin } = action;
  return {
    ...state,
    isLogin, // initialState 와 mapping
  };
};

export default reducer;
export const actionCreators = {
  setLogin,
};
