const SET_MENULIST = "SET_MENULIST";

const initialState = {
  menuList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENULIST:
      return applySetMenuList(state, action);
    default:
      return state;
  }
};

const setMenuList = (menuList) => {
  return {
    type: SET_MENULIST,
    menuList,
  };
};

const applySetMenuList = (state, action) => {
  const { menuList } = action;
  return {
    ...state,
    menuList,
  };
};

export default reducer;
export const actionCreators = {
  setMenuList,
};
