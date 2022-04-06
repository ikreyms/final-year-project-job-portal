import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  let user = useSelector((state) => state.user);
  user = JSON.stringify(user);
  return <div>{user}</div>;
};

export default Profile;
