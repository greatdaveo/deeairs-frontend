import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { userInfo, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  if (!isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isLoading && !userInfo) {
    return navigate("/login");
  }

  return (
    <div>
      <h1>Account page for: {userInfo.name}</h1>
    </div>
  );
};

export default DashboardPage;
