import React from "react";
import { Routes, Route } from "react-router-dom";

// user routes
import Issued from "./default/Issued";
import Home from "./default/Home";
import IssuerProfile from "./issuerRole/Profile";
import Search from "./default/Search";

// admin routes
import DashboardMain from "./adminRole/Dashboard/DashboardMain";
import ManageIssuers from "./adminRole/ManageIssuers";
import IssueCertificate from "./issuerRole/IssueCertificate";
import BurnCertificate from "./issuerRole/burnCertificate";

const Main = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/issued" element={<Issued />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />

      {/* Admin Routes */}
      <Route path="/manage_issuers" element={<ManageIssuers />} />
      <Route path="/dashboard" element={<DashboardMain />} />

      {/* Issuer Routes */}
      <Route path="/issue" element={<IssueCertificate />} />
      <Route path="/revoke" element={<BurnCertificate />} />
      <Route path="/issuer_profile" element={<IssuerProfile />} />
    </Routes>
  );
};

export default Main;
