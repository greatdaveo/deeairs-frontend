import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const SharedLayout = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
