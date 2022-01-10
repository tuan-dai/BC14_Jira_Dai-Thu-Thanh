import React from "react";
import { NavLink } from "react-router-dom";
export default function MainMenu() {
  return (
    <div className="menu md:w-64 bg-gray-100 px-2">

      {/* ACOUNT */}
      <div className="flex items-center gap-2 pl-3 py-4 mb-2">
        <img className="rounded-full w-1/6" src="/img/download.jfif" alt="" />
        <div className="flex flex-col">
          <span className="font-bold mb-0">CyberLearn.vn</span>
          <span className="text-sm">Report bugs</span>
        </div>
      </div>

      {/* FEATURE */}
      <div className="px-2.5">
        <div className="relative flex items-center rounded-sm hover:bg-gray-200 py-2">
          <span className="pl-2 text-left"><i className="fa fa-project-diagram"></i></span>
          <NavLink className='absolute left-9 text-black hover:text-black' to="/project">
            Project Management
          </NavLink>
        </div>
<<<<<<< HEAD

        <div className="relative flex items-center rounded-sm hover:bg-gray-200 py-2 my-2">
          <span className="pl-2 text-lg text-left"><i className="fa fa-cog" /></span>
          <NavLink className='absolute left-9 text-black  hover:text-black' to="/createproject">
            Create Project
          </NavLink>
=======
        <div>
          <i className="fa fa-cog" />
          <NavLink to="/project" className="ml-4 text-black">Project Management</NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink to="/createproject" className="ml-4 text-black">Create Project</NavLink>
>>>>>>> origin
        </div>

        <div className="relative flex items-center rounded-sm hover:bg-gray-200 py-2 ">
          <span className="pl-2 text-left"><i className="fa fa-user"></i></span>
          <NavLink className='absolute left-9 text-black  hover:text-black' to="/user-management">
            User Management
          </NavLink>
        </div>

        <div className="my-4" style={{ border: '1px solid rgb(193, 199, 208)' }}></div>

        <div className="relative flex items-center rounded-sm hover:bg-gray-200 py-2">
          <span className="pl-2 text-left"><i className="fa fa-truck" /></span>
          <NavLink className='absolute left-9 text-black hover:text-black' to='#'>Releases</NavLink>
        </div>

        <div className="relative flex items-center rounded-sm  hover:bg-gray-200 py-2 my-2">
          <span className="pl-2 text-left"><i className="fa fa-equals" /></span>
          <NavLink className='absolute left-9 text-black hover:text-black' to='#'>Issues and filters</NavLink>
        </div>

        <div className="relative flex items-center rounded-sm  my-2 hover:bg-gray-200 py-2">
          <span className="pl-2 text-left"><i className="fa fa-paste" /></span>
          <NavLink className='absolute left-9 text-black hover:text-black' to='#'>Pages</NavLink>
        </div>

        <div className="relative flex items-center rounded-sm  hover:bg-gray-200 py-2">
          <span className="pl-2 text-left"><i className="fa fa-location-arrow" /></span>
          <NavLink className='absolute left-9 text-black hover:text-black' to='#'>Reports</NavLink>
        </div>

        <div className="relative flex items-center rounded-sm  my-2 hover:bg-gray-200 py-2">
          <span className="pl-2 text-left"><i className="fa fa-box" /></span>
          <NavLink className='absolute left-9 text-black hover:text-black' to='#'>Components</NavLink>
        </div>
      </div>
    </div>
  );
}
