import React from "react";
import { Route } from "react-router-dom";
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
            <Component {...propsRoute} />
          </div>
        );
      }}
    />
  );
};
