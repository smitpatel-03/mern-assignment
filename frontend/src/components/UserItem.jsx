import React, { useState } from "react";
import axios from "axios";
const UserItem = ({ user }) => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const sendVerification = async () => {
    try {
      const reqData = {
        email: user.email,
      };
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("api/v1/user/verify", reqData, config);
      console.log(data);
      setSent(true);
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 d-flex justify-content-between shadow-lg p-3 mb-3 bg-white rounded align-items-center">
        <span>{user.email}</span>
        <span>
          <button className="btn btn-primary" onClick={sendVerification}>
            Verify
          </button>
          {sent ? (
            <div>Sent Successfully</div>
          ) : (
            <div>{error && "can't send email there is error"}</div>
          )}
        </span>
      </div>
    </div>
  );
};

export default UserItem;
