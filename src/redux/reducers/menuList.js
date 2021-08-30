const SET_MENULIST = "SET_MENULIST";
const UPDATE_MENULIST = "UPDATE_MENULIST";

const initialState = {
  menuList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENULIST:
      return applySetMenuList(state, action);
    case UPDATE_MENULIST:
      return applyUpdateMenuList(state, action);
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

const updateMenuList = (menu) => {
  return {
    type: UPDATE_MENULIST,
    menu,
  };
};

const applySetMenuList = (state, action) => {
  const { menuList } = action;
  return {
    ...state,
    menuList,
  };
};

const applyUpdateMenuList = (state, action) => {
  const { menu: target } = action;

  const newMenuList = state.menuList.map((menu) => {
    return menu.menu_idx === target.menu_idx ? target : menu;
  });

  return {
    ...state,
    menuList: newMenuList,
  };
};

export default reducer;
export const actionCreators = {
  setMenuList,
  updateMenuList,
};
