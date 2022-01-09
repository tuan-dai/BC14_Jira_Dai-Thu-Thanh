import React from "react";

export default function Info(props) {
  const { projectDetail } = props;

  const renderAvatar = () => {
    return projectDetail?.members.map((member) => {
      return (
        <div key={member.userId} className="avatar mr-2">
          <img src={member.avatar} alt="1" />
        </div>
      );
    });
  };
  return (
    <div className="flex items-center form-group">
      <div className="search-block mr-3">
        <input className="search form-control" />
      </div>
      <div className="avatar-group flex items-center">{renderAvatar()}</div>
      <div style={{ marginLeft: 20 }} className="text">
        <button className="hover:bg-gray-200 p-2">Only My Issues</button>
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        <button className="hover:bg-gray-200 p-2">Recently Updated</button>
      </div>
    </div>
  );
}
