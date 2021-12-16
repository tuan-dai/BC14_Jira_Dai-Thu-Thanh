import React from "react";
import { NavLink } from "react-router-dom";
export default function MainMenu() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src="/img/download.jfif" alt="" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink to="/" className="ml-4 text-black">Cyber Board</NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink to="/project" className="ml-4 text-black">Project Management</NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink to="/createproject" className="ml-4 text-black">Create Project</NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span className="ml-4">Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span className="ml-4">Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span className="ml-4">Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span className="ml-4">Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span className="ml-4">Components</span>
        </div>
      </div>
    </div>
  );
}
