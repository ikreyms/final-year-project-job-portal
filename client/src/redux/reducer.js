import { LOGIN, LOGOUT } from "./actions";

const initState = {
  loggedIn: false,
  user: {
    // id: 1,
    // firstName: "Mohamed",
    // lastName: "Ikram",
    // email: "ikreyms@gmail.com",
    // following: ["Dhiraagu", "MPL", "Ooredoo"],
    // ratings: [{ employer: "Dhiraagu", rating: 4.5 }],
    // accountType: "guest",
  },
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
