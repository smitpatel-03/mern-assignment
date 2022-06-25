import React from "react";

const UserItem = ({ user }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 d-flex justify-content-between shadow-lg p-3 mb-3 bg-white rounded align-items-center">
        <span>{user.email}</span>
        <span>
          <button className="btn btn-primary">Verify</button>
        </span>
      </div>
    </div>
  );
};

export default UserItem;
