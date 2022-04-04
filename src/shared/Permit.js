import React from "react";
import { useSelector } from "react-redux";
import { isSession } from "./firebase";

const Permit = props => {
  const user_info = useSelector(state => state.user.user);
  const is_login = isSession();
  if (is_login && user_info) {
    return <>{props.children}</>;
  }
  return null;
};

export default Permit;
