import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import axios from "axios";

const UserList = () => {
  const [emails, setEmails] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("api/v1/users");
      console.log(data.emails);
      setEmails(data.emails);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container">
      <h1 className="mb-5">User List with Email for Verification</h1>
      {emails &&
        emails.map((email, index) => <UserItem user={email} key={index} />)}
    </div>
  );
};

export default UserList;
