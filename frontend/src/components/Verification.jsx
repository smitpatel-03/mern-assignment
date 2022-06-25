import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import verify from "./verify.png";

const Verification = () => {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);

  const verifyUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/verify/email/${token}`);
      console.log(data);

      if (data.success === true) {
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
        <div>
          <header class="site-header" id="header">
            <h1 class="site-header__title">Verified Successfully!</h1>
          </header>

          <div class="main-content">
            <img src={verify} alt="verified" />
            <p class="main-content__body">
              You are verified Successfully You can move Further
            </p>
          </div>
        </div>
      ) : (
        <div>Invalid Token or Token Expired</div>
      )}
    </div>
  );
};

export default Verification;
