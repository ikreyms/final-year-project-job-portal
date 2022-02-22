import { LOGIN } from "./actions";

const initState = {
  loggedIn: false,
  user: {
    id: 1,
    firstName: "Mohamed",
    lastName: "Ikram",
    email: "ikreyms@gmail.com",
    following: ["Dhiraagu", "MPL", "Ooredoo"],
    ratings: [{ employer: "Dhiraagu", rating: 4.5 }],
    userType: "guest",
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

export default reducer;
