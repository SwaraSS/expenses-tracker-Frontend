import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const userLogin = useSelector(state => state?.userAuth);
  //const { userAuth } = user;
  // return (
  //   <Route
  //     {...rest}
  //     render={() =>
  //       userAuth?.isAdmin ? (
  //         <Component {...rest} />
  //       ) : (
  //         <Redirect to="/not-admin" />
  //       )
  //     }
  //   />
  // );
  return userLogin?.isAdmin ? <Component {...rest} /> : <Navigate to="/not-found" />;
};

export default AdminRoute;