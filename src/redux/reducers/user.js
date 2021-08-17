const initialState = {};

const SET_USER = "USER/SET_USER";

export const actions = {
  setUser: (user) => {
    return {
      type: SET_USER,
      payload: user,
    };
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default reducer;
