import React from "react";
import { Route, Redirect, useParams } from "react-router-dom";
import Status from "../pages/Status";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Homepage from "../pages/Homepage";

export default function PublicRoute({component: Component, isAuthenticated, ...rest}) {

  const publicRoutes = [
    {
      name: "SignUp",
      path: "/register",
      exact: true,
      component: SignUp
      // icon: <MoreOutlinedIcon />
    },
    {
      name: "SignUp",
      path: "/login",
      exact: true,
      component: Login
      // icon: <MoreOutlinedIcon />
    }
  ];

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated === false ? (
          <Component />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};