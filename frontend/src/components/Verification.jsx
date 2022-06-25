import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Verification = () => {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);

  const verifyUser = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get(`/api/v1/user/verify/${token}`, config);
      if (data.sucess) {
        setVerified(true);
      }
    } catch (e) {
      setVerified(false);
    }
  };
  useEffect(() => {
    verifyUser();
  });
  return (
    <div>
      {verified ? (
        <div>verified Successfully</div>
      ) : (
        <div>Invalid Token or Token Expired</div>
      )}
    </div>
  );
};

export default Verification;
