import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import User from "../context/User";

// user routes
import Issued from "./default/Issued";
import UserHome from "./default/UserHome";
import IssuerProfile from "./issuerRole/IssuerProfile";
import Search from "./default/Search";
import CertificateInfo from "./default/CertificateInfo";
import UserProfile from "./default/UserProfile";

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

const Main = () => {
  const { role } = useContext(User);

  const homeScreen = () => {
    switch (role) {
      case ROLES.ADMIN:
        return <AdminHome />;
      case ROLES.ISSUER:
        return <IssuerHome />;
      case ROLES.USER:
        return <UserHome />;
    }
  };

  return (
    <Routes>
      {/* <Route path="/" element={} */}

      {/* User Specific Routes */}

      <Route path="/" element={homeScreen()} />
      {/* <Route path="/search" element={<Search />} /> */}
      <Route path="/certificate/:id" element={<CertificateInfo />} />
      <Route path="/profile" element={<UserProfile />} />

      {/* Admin Specific Routes */}
      <Route path="/create_issuer" element={<CreateIssuer />} />

      {/* Issuer Specific Routes */}
      <Route path="/issue" element={<IssueCertificate />} />
      <Route path="/issuer/profile" element={<IssuerProfile />} />
    </Routes>
  );
};

export default Main;
