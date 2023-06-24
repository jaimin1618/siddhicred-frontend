import React from "react";
import { Routes, Route } from "react-router-dom";

// user routes
import Issued from "./default/Issued";
import Home from "./default/Home";
import Profile from "./default/Profile";
import Search from "./default/Search";

// admin routes
import DashboardMain from "./adminRole/Dashboard/DashboardMain";
import ManageIssuers from "./adminRole/ManageIssuers";

const Main = (userRole) => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/issued" element={<Issued />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin Routes */}
      <Route path="/manage_issuer" element={<ManageIssuers />} />
      <Route path="/dashboard" element={<DashboardMain />} />
    </Routes>
  );
};

export default Main;
