import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import User from "../context/User";

import ApplicationHome from "./ApplicationHome/ApplicationHome";
import Register from "./earner/Register";

// earner routes
import EarnerHome from "./earner/EarnerHome";
import IssuerProfile from "./issuerRole/IssuerProfile";
import Search from "./earner/Search";
import CertificateInfo from "./earner/CertificateInfo";
import EarnerProfile from "./earner/EarnerProfile";

// issuer routes
import IssuerHome from "./issuerRole/IssuerHome";
import IssueCertificate from "./issuerRole/IssueCertificate";
import BurnCertificate from "./issuerRole/burnCertificate";

// admin routes
import AdminHome from "./adminRole/Dashboard/AdminHome";
import ManageIssuers from "./adminRole/ManageIssuers";
import CreateIssuer from "./adminRole/CreateIssuer";

// other imports
import { ROLES } from "../constants";
import PageNotFound from "../common/PageNotFound";

const Main = () => {
  const { role } = useContext(User);

  const homeScreen = () => {
    switch (role) {
      case ROLES.ADMIN:
        return <AdminHome />;
      case ROLES.ISSUER:
        return <IssuerHome />;
      case ROLES.EARNER:
        return <EarnerHome />;
    }
  };

  return (
    <div className="">
      <Routes>
        {/* User Specific Routes */}
        <Route path="/" element={<ApplicationHome />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={homeScreen()} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/certificate/:id" element={<CertificateInfo />} />
        <Route path="/profile" element={<EarnerProfile />} />

        {/* Admin Specific Routes */}
        <Route path="/create_issuer" element={<CreateIssuer />} />

        {/* Issuer Specific Routes */}
        <Route path="/issue" element={<IssueCertificate />} />
        <Route path="/issuer/profile" element={<IssuerProfile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default Main;
