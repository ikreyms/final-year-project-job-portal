import { LOGIN, LOGOUT } from "./actions";

const initState = {
  loggedIn: false,
  user: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true, user: { ...action.payload } };
    case LOGOUT:
      return { ...state, loggedIn: false, user: {} };
    default:
      return state;
  }
};

export default reducer;
