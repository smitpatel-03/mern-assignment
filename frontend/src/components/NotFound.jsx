import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>404 NotFound</h1>
      <button className="btn btn-primary" onClick={handleNavigate}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
