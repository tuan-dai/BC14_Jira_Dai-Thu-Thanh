import React from "react";
import { Route, Redirect } from "react-router-dom";
import MainMenu from "../_component/MainMenu";
import Sidebar from "../_component/Sidebar";
export const JiraTemplate = (props) => {
  let { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div className="jira">
            <Sidebar />
            <MainMenu />
            {localStorage.getItem('USER_LOGIN')
              ? <Redirect to='/project' />
              : <Redirect to='/signin' />}
            <Component {...propsRoute} />
          </div>
        );
      }}
    />
  );
};
