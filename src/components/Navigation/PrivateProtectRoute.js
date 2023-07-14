import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";

const PrivateProtectRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const userLogin = useSelector(state => state?.users?.userAuth);
  //const { userAuth } = user;
//   return (
//     <Routes>
//     <Route
//       {...rest}
//       element={
//         userLogin ? <Component {...rest} /> : <Navigate to="/login" />
//       }
//     />
//     </Routes>
//   );

return userLogin ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateProtectRoute;